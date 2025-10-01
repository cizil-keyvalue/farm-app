"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => (
  <div>
    <h1>Something went wrong!</h1>
    <p>An error occurred while loading the farm details.</p>
    <Link href="/">Back to Dashboard</Link>
  </div>
);

export default Error;
