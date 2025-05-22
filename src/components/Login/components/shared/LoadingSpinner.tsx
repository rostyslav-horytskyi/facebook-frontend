import DotLoader from 'react-spinners/DotLoader';

type LoadingSpinnerProps = {
  loading: boolean;
  size?: number;
  color?: string;
};

export const LoadingSpinner = ({
  loading,
  size = 30,
  color = '#1876f2',
}: LoadingSpinnerProps) => (
  <DotLoader color={color} loading={loading} size={size} />
);
