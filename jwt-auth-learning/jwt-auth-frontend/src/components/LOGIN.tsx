// src/components/LOGIN.tsx
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';
import { type LoginCredentials, type LoginResponse } from '../types/auth.types';
import { useState } from 'react';
import { mockLogin } from '../utils/mockAuth';

function LOGIN() {
  const [apiError, setApiError] = useState('');
  const [useMock, setUseMock] = useState<boolean>(true);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginCredentials>();

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    setApiError('');

    try {
      if (useMock) {
        const mockResponse = await mockLogin(data.name, data.password);
        login(mockResponse.token);
        navigate('/authorized');
      } else {
        const response = await api.post('/login', data);
        const responseData: LoginResponse = response.data;
        login(responseData.token);
        navigate('/authorized');
      }

    } catch (err: any) {
      console.error('Login failed:', err);
      setApiError(err.message || err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {apiError && (
          <div style={{ padding: '10px', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
            {apiError}
          </div>
        )}

        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            })}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderColor: errors.name ? 'red' : '#ccc'
            }}
          />
          {errors.name && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderColor: errors.password ? 'red' : '#ccc'
            }}
          />
          {errors.password && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h4>For Testing (No Backend Yet):</h4>
        <p>Use any name and password to test the UI flow.</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          (We'll add mock login next)
        </p>
      </div>
    </div>
  );
}

export default LOGIN;