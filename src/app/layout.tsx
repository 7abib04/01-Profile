// app/layout.tsx
"use client";
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Your App Title</title>
      </head>
      <body>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
