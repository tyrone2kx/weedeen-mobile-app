import { useQueryClient } from '@tanstack/react-query';
import { apiWrapper, httpClient } from '@wd/api';
import { CreateSOSAlertDto } from '@wd/generated/models/CreateSOSAlertDto';
import { UpdateSOSAlertDto } from '@wd/generated/models/UpdateSOSAlertDto';
import { SosAlertService } from '@wd/generated/services/SosAlertService';
import { getHeaders, handleError, Notify } from '@wd/utils/helpers';
import useLoading from '@wd/utils/useLoading';
import { Platform } from 'react-native';

interface Props {
  emergencyId?: string;
  onSuccess?: () => void;
}

// Maps a picked asset (react-native-image-picker / document picker) to the
// { uri, name, type } shape React Native's FormData expects for a file part.
const toFilePart = (file: any) => ({
  uri:
    Platform.OS === 'ios' ? file?.uri?.replace('file://', '') : file?.uri,
  name: file?.fileName || file?.name || `upload-${Date.now()}`,
  type: file?.type || 'application/octet-stream',
});

/**
 * Creates (multipart, with media) or updates (JSON) an SOS alert. Mirrors the
 * web resident useCreateOrUpdateEmergency hook.
 */
const useCreateOrUpdateEmergency = ({
  emergencyId,
  onSuccess,
}: Props = {}) => {
  const queryClient = useQueryClient();
  const loader = useLoading();

  const createOrUpdateEmergency = async (
    body: CreateSOSAlertDto | UpdateSOSAlertDto,
    images: any[] = [],
    videos: any[] = [],
    audios: any[] = [],
    latitude?: number,
    longitude?: number,
  ) => {
    try {
      loader.startLoading();
      const payload: any = { ...body };
      if (latitude) payload.latitude = latitude;
      if (longitude) payload.longitude = longitude;

      let result;
      if (emergencyId) {
        // Update goes through the generated JSON endpoint.
        result = await apiWrapper(() =>
          SosAlertService.sosAlertControllerUpdate({
            id: emergencyId,
            requestBody: payload,
          }),
        );
      } else {
        // Create uses multipart so the alert can carry media.
        const headers = await getHeaders(true);
        const formData = new FormData();
        Object.keys(payload).forEach(key => {
          if (payload[key] !== undefined && payload[key] !== null) {
            formData.append(key, String(payload[key]));
          }
        });
        images.forEach(file =>
          formData.append('images', toFilePart(file) as any),
        );
        videos.forEach(file =>
          formData.append('videos', toFilePart(file) as any),
        );
        audios.forEach(file =>
          formData.append('audios', toFilePart(file) as any),
        );

        const { data } = await apiWrapper(() =>
          httpClient.post('/sos-alert', formData, { headers }),
        );
        result = data;
      }

      Notify({
        type: 'success',
        title: 'Success',
        message: `Emergency ${emergencyId ? 'updated' : 'created'} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['sos-alerts'] });
      queryClient.invalidateQueries({ queryKey: ['emergency-statistics'] });
      onSuccess?.();
      return result;
    } catch (error) {
      handleError(error);
    } finally {
      loader.stopLoading();
    }
  };

  return {
    isLoading: loader.loading,
    createOrUpdateEmergency,
  };
};

export default useCreateOrUpdateEmergency;
