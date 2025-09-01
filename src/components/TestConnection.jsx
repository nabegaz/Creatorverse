import React from 'react';
import { supabase } from '../client';

function TestConnection() {
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('creator')
        .select('*')
        .limit(1);
      
      if (error) {
        console.error('Connection test failed:', error);
        alert(`Connection test failed: ${error.message}`);
      } else {
        console.log('Connection successful! Data:', data);
        alert('Connection test successful!');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(`Network error: ${error.message}`);
    }
  };

  const testInsert = async () => {
    try {
      console.log('Testing insert...');
      
      const testCreator = {
        name: 'Test Creator',
        description: 'This is a test creator',
        url: 'https://test.com',
        imageURL: 'https://via.placeholder.com/300x200'
      };
      
      const { data, error } = await supabase
        .from('creator')
        .insert([testCreator])
        .select();
      
      if (error) {
        console.error('Insert test failed:', error);
        alert(`Insert test failed: ${error.message}`);
      } else {
        console.log('Insert successful! Data:', data);
        alert('Insert test successful!');
      }
    } catch (error) {
      console.error('Insert error:', error);
      alert(`Insert error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Database Connection Test</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={testConnection}>Test Connection</button>
        <button onClick={testInsert}>Test Insert</button>
      </div>
    </div>
  );
}

export default TestConnection;
