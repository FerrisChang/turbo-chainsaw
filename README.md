   
    if (existingToken) {
      return existingToken;
    }
    
    // If no token exists, get a new one using client credentials
    this.getTokenFromClientCredentials().subscribe({
      next: (response: any) => {
        const token = response.access_token;
        localStorage.setItem('authToken', token);
        console.log('New token obtained:', token);
      },
      error: (error) => {
        console.error('Failed to get token:', error);
      }
    });
    
    return existingToken || '';
  }

  private getTokenFromClientCredentials() {
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID
    const clientSecret = 'YOUR_CLIENT_SECRET'; // Replace with your actual client secret
    const tokenUrl = 'https://your-auth-server.com/oauth/token'; // Replace with your auth server URL
    
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    
    return this.http.post(tokenUrl, body.toString(), { headers });
  }
