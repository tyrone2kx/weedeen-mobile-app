import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Button from '@wd/components/Button/Button';
import Input from '@wd/components/Input/Input';
import PasswordChecker from '@wd/components/PasswordChecker/PasswordChecker';
import { AuthService, UpdatePasswordDto } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const ChangePasswordTab = () => {
  const user = useAppSelector(state => state.user?.currentUser);
  const { isPending: isLoading, mutate: changePassword } = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: UpdatePasswordDto;
    }) =>
      apiWrapper(() =>
        AuthService.authControllerChangeUserPassword({ id, requestBody }),
      ),
    onSuccess: () => {
      setPassword('');
      setOldPassword('');
      setPasswordAgain('');
    },
  });

  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (password && passwordAgain && password === passwordAgain) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, passwordAgain]);

  return (
    <View className="mt-6 flex-1 justify-between">
      <View>
        <View className=" mb-4">
          <Input
            label="Old password"
            onChange={e => setOldPassword(e)}
            placeholder="Enter old password"
            secureEntry
            type="default"
            value={oldPassword}
          />
        </View>
        <View className=" mb-4">
          <Input
            label="Choose a password"
            onChange={e => setPassword(e)}
            placeholder="Enter new password"
            secureEntry
            value={password}
          />
        </View>
        <View className=" mb-4">
          <Input
            label="Confirm password"
            onChange={e => setPasswordAgain(e)}
            placeholder="Confirm new password"
            secureEntry
            value={passwordAgain}
          />
        </View>
        {password && (
          <View className=" mb-4">
            <PasswordChecker setDisabled={setDisabled} text={password} />
          </View>
        )}
      </View>
      <Button
        className="mb-6"
        disabled={disabled}
        isLoading={isLoading}
        label="Change Password"
        onPress={() =>
          changePassword({
            id: user?.id || '',
            requestBody: { oldPassword, newPassword: password },
          })
        }
      />
    </View>
  );
};

export default ChangePasswordTab;
