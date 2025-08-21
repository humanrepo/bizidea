import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://arnolddigital:Godblessme25@cluster0.2h2f3rs.mongodb.net/capstone-dev?retryWrites=true&w=majority';
    
    // Use the provided MongoDB connection string
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Atlas connectée: ${conn.connection.host}`);
    console.log(`📊 Base de données: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB Atlas:', error);
    console.log('🔄 Tentative de connexion locale...');
    
    // Fallback sur MongoDB local
    try {
      const localURI = 'mongodb://localhost:27017/capstone-local';
      const localConn = await mongoose.connect(localURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`✅ MongoDB Local connectée: ${localConn.connection.host}`);
    } catch (localError) {
      console.error('❌ Erreur connexion locale:', localError);
    }
  }
};

export default connectDB;
