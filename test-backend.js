import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

async function testBackend() {
  try {
    console.log('🧪 Test du backend...\n');

    // Test 1: Status endpoint
    console.log('1. Test du status endpoint...');
    const statusResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Status:', statusResponse.data.message);

    // Test 2: Register user
    console.log('\n2. Test d\'inscription...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
      console.log('✅ Inscription réussie:', registerResponse.data.user.name);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.includes('already')) {
        console.log('ℹ️ Utilisateur déjà existant');
      } else {
        throw error;
      }
    }

    // Test 3: Login
    console.log('\n3. Test de connexion...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
    console.log('✅ Connexion réussie:', loginResponse.data.user.name);
    
    const token = loginResponse.data.token;

    // Test 4: Get ideas (protected route)
    console.log('\n4. Test des idées (route protégée)...');
    const ideasResponse = await axios.get(`${BASE_URL}/api/ideas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Récupération des idées réussie, nombre:', ideasResponse.data.ideas.length);

    console.log('\n🎉 Tous les tests sont passés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.response?.data || error.message);
  }
}

testBackend();