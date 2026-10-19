'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminCurrencyStub() {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch('/currency/rate')
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed'));
  }, []);

  return (
    <div className="cb-shell-card">
      <h2>FX / display rates</h2>
      {error && <p className="cb-auth-error">{error}</p>}
      {data != null && (
        <pre className="text-xs overflow-auto mt-3 bg-[#f5f5f5] p-3">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
