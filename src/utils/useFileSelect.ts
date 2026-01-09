import { pick, types } from '@react-native-documents/picker';
import { useState } from 'react';
import {
  Asset,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { Notify } from './helpers';
import { FileType } from './types';

const MAX_FILE_SIZE_MB = 10; // Larger for documents
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'application/zip',
  'application/x-rar-compressed',
];

interface FileSelectOptions {
  allowedTypes?: FileType[];
  maxFileSizeMB?: number;
  maxSelectionCount?: number;
  selectionLimit?: number;
  mediaType?: 'photo' | 'video' | 'mixed' | 'document';
  includeExtra?: boolean;
}

const useFileSelect = (options: FileSelectOptions = {}) => {
  const {
    allowedTypes = ALLOWED_FILE_TYPES as FileType[],
    maxFileSizeMB = MAX_FILE_SIZE_MB,
    maxSelectionCount,
    selectionLimit = 1,
    mediaType = 'mixed',
    includeExtra = true,
  } = options;

  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFileTypeCategory = (
    mimeType: string,
  ): 'image' | 'video' | 'unknown' => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    return 'unknown';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileTypeErrorMessage = (): string => {
    const imageTypes = allowedTypes.filter(type => type.startsWith('image/'));
    const videoTypes = allowedTypes.filter(type => type.startsWith('video/'));

    const formatTypes = (types: FileType[]): string => {
      return types.map(type => type.split('/')[1].toUpperCase()).join(', ');
    };

    const messages: string[] = [];
    if (imageTypes.length > 0) {
      messages.push(`Images: ${formatTypes(imageTypes)}`);
    }
    if (videoTypes.length > 0) {
      messages.push(`Videos: ${formatTypes(videoTypes)}`);
    }

    return messages.join('; ');
  };

  const mapDocumentToAsset = (doc: any): Asset => {
    return {
      uri: doc.uri,
      fileName: doc.name,
      type: doc.type,
      fileSize: doc.size,
      width: 0,
      height: 0,
    };
  };

  const openDocumentPicker = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await pick({
        type: mapMimeTypesToDocumentTypes(allowedTypes),
        allowMultiSelection: selectionLimit !== 1,
        presentationStyle: 'fullScreen',
      });

      const documents = result;

      // Validate documents
      const validDocuments: any[] = [];
      const errors: string[] = [];

      documents.forEach((doc, index) => {
        const docNumber = index + 1;
        const fileName = doc.name || `Document ${docNumber}`;

        // File size validation
        if (doc.size && doc.size > maxFileSizeMB * 1024 * 1024) {
          errors.push(
            `${fileName}: File size exceeds ${maxFileSizeMB}MB limit.`,
          );
          return;
        }

        // File type validation
        const fileType = doc.type || '';
        if (
          allowedTypes.length > 0 &&
          !allowedTypes.includes(fileType as FileType)
        ) {
          errors.push(`${fileName}: Invalid file type.`);
          return;
        }

        // Max selection count validation
        if (maxSelectionCount && validDocuments.length >= maxSelectionCount) {
          errors.push(
            `Maximum selection limit of ${maxSelectionCount} reached.`,
          );
          return;
        }

        // Limit validation
        if (
          selectionLimit &&
          selectionLimit !== 1 &&
          validDocuments.length >= selectionLimit
        ) {
          errors.push(`You can only select up to ${selectionLimit} files.`);
          return;
        }

        validDocuments.push(doc);
      });

      // Show errors if any
      if (errors.length > 0) {
        errors.forEach(error => {
          Notify({
            type: 'error',
            message: error,
          });
        });
      }

      // Update selected files
      if (validDocuments.length > 0) {
        if (selectionLimit === 1) {
          setSelectedFiles([mapDocumentToAsset(validDocuments[0])]);
        } else {
          const mappedDocuments = validDocuments.map(mapDocumentToAsset);
          setSelectedFiles(mappedDocuments);
        }
      }
    } catch (err) {
      Notify({
        type: 'error',
        message: 'Failed to select document',
        title: 'Error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openImageLibrary = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await launchImageLibrary({
        mediaType: mediaType as MediaType,
        includeExtra,
        selectionLimit: selectionLimit === 0 ? undefined : selectionLimit,
        presentationStyle: 'fullScreen',
        quality: 1,
      });

      if (result.errorMessage) {
        Notify({ type: 'error', message: result.errorMessage, title: 'Error' });
        return;
      }

      if (!result?.didCancel && result?.assets && result.assets.length > 0) {
        const files: Asset[] = result.assets;

        // Validate each file
        const validFiles: Asset[] = [];
        const errors: string[] = [];

        files.forEach((file, index) => {
          const fileNumber = index + 1;
          const fileType = file.type || '';
          const fileCategory = getFileTypeCategory(fileType);
          const fileName = file.fileName || `File ${fileNumber}`;

          // File type validation
          if (
            allowedTypes.length > 0 &&
            !allowedTypes.includes(fileType as FileType)
          ) {
            errors.push(
              `${fileName}: Invalid file type. Allowed: ${getFileTypeErrorMessage()}`,
            );
            return;
          }

          // File size validation
          if (file?.fileSize && file.fileSize > maxFileSizeMB * 1024 * 1024) {
            errors.push(
              `${fileName}: File size (${formatFileSize(file.fileSize)}) exceeds ${maxFileSizeMB}MB limit.`,
            );
            return;
          }

          // Video duration check (optional)
          if (
            fileCategory === 'video' &&
            file.duration &&
            file.duration > 300
          ) {
            // 5 minutes
            errors.push(`${fileName}: Video duration exceeds 5 minute limit.`);
            return;
          }

          // Max selection count validation
          if (maxSelectionCount && validFiles.length >= maxSelectionCount) {
            errors.push(
              `Maximum selection limit of ${maxSelectionCount} reached.`,
            );
            return;
          }

          // Add file duration and category for easier filtering later
          const enrichedFile = {
            ...file,
            category: fileCategory,
          };

          validFiles.push(enrichedFile);
        });

        // Show errors if any
        if (errors.length > 0) {
          errors.forEach(error => {
            Notify({
              type: 'error',
              message: error,
            });
          });
        }

        // Handle selection based on mode
        if (validFiles.length > 0) {
          if (selectionLimit === 1) {
            // Single selection mode - replace existing
            setSelectedFiles([validFiles[0]]);
          } else if (selectionLimit && validFiles.length > selectionLimit) {
            Notify({
              type: 'error',
              message: `You can only select up to ${selectionLimit} files.`,
            });
          } else {
            // Multi-selection mode - replace existing selection
            setSelectedFiles(validFiles);

            // Or if you want to accumulate selections, uncomment this:
            // setSelectedFiles(prev => {
            //   const combined = [...prev, ...validFiles];
            //   if (maxSelectionCount && combined.length > maxSelectionCount) {
            //     Notify({
            //       type: 'error',
            //       message: `Maximum cumulative selection of ${maxSelectionCount} reached.`,
            //     });
            //     return prev;
            //   }
            //   return combined;
            // });
          }
        }
      }
    } catch (error) {
      Notify({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to open file picker',
        title: 'Error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openFilePicker = async (): Promise<void> => {
    if (mediaType === 'document') {
      await openDocumentPicker();
    } else {
      await openImageLibrary();
    }
  };

  const removeFile = (index: number): void => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeAllFiles = (): void => {
    setSelectedFiles([]);
  };

  return {
    selectedFiles,
    selectedFile: selectedFiles[0] || null,
    openFilePicker,
    openDocumentPicker,
    setSelectedFiles,
    removeFile,
    removeAllFiles,
    isLoading,
    count: selectedFiles.length,
  };
};

// Helper function to map MIME types to DocumentPicker types
const mapMimeTypesToDocumentTypes = (mimeTypes: FileType[]): any[] => {
  const typeMap: Record<string, any> = {
    'application/pdf': types.pdf,
    'application/msword': types.doc,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      types.docx,
    'application/vnd.ms-excel': types.xls,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      types.xlsx,
    'application/vnd.ms-powerpoint': types.ppt,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      types.pptx,
    'text/plain': types.plainText,
    'application/zip': types.zip,
  };

  const documentTypes: any[] = [];

  mimeTypes.forEach(mimeType => {
    if (typeMap[mimeType]) {
      documentTypes.push(typeMap[mimeType]);
    }
  });

  // If no specific types matched, return allFiles
  return documentTypes.length > 0 ? documentTypes : [types.allFiles];
};

export default useFileSelect;
