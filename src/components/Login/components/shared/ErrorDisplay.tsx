type ErrorDisplayProps = {
  error: any;
  className?: string;
};

export const ErrorDisplay = ({ error, className }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className={className || 'error_text'}>
      {error.response?.data?.message || error.message}
    </div>
  );
};
