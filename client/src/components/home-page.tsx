import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Application</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link to="/scheine" className="btn btn-primary">Create Scheine</Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Updates</h2>
        <ul className="list-disc list-inside">
          <li>Feature: PDF generation for Scheine</li>
          <li>Improved user interface for easier navigation</li>
          <li>Bug fixes and performance improvements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p>
          If you need assistance, please send your question to <a href="mailto:me@suryasurakhman.com" className="text-blue-600 hover:underline">me@suryasurakhman.com</a>.
        </p>
      </section>
    </div>
  );
};
