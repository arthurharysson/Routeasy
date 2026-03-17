import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ButtonProps } from './types';

const baseStyles = 'flex-row items-center justify-center rounded-full w-full';

const variantStyles = {
  solid: 'bg-indigo-500',
  outline: 'border-2 border-indigo-500 bg-transparent',
};

const sizeStyles = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
};

const textVariantStyles = {
  solid: 'text-white',
  outline: 'text-indigo-500',
};

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function Button({
  label,
  variant = 'solid',
  size = 'md',
  icon,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled ? 'opacity-50' : '',
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' ? '#fff' : '#6366f1'}
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text
            className={[
              'font-semibold',
              textVariantStyles[variant],
              textSizeStyles[size],
            ].join(' ')}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
