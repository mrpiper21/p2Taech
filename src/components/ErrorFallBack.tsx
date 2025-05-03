export default function ErrorFallback({ error }: {error: {message: string}}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
      </div>
    );
  }