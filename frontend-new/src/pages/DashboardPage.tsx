import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ideasAPI } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { PlusCircle, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface BusinessIdea {
  _id: string;
  title: string;
  description: string;
  industry: string;
  status: string;
  createdAt: string;
  marketAnalysis: {
    score: number;
  };
  aiInsights: {
    viabilityScore: number;
  };
}

const DashboardPage: React.FC = () => {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchIdeas();
  }, [filter]);

  const fetchIdeas = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await ideasAPI.getAll(params);
      setIdeas(response.data.ideas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIdea = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        await ideasAPI.delete(id);
        setIdeas(ideas.filter(idea => idea._id !== id));
      } catch (error) {
        console.error('Error deleting idea:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'analyzing': return 'bg-blue-100 text-blue-800';
      case 'validated': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getViabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ideas</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="analyzing">Analyzing</SelectItem>
              <SelectItem value="validated">Validated</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => navigate('/app/generate')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Generate New Idea
          </Button>
        </div>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No ideas yet</h2>
          <p className="text-gray-600 mb-6">Start by generating your first business idea</p>
          <Button onClick={() => navigate('/app/generate')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Generate First Idea
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {ideas.map((idea, index) => (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{idea.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(idea.status)}`}>
                      {idea.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{idea.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{idea.industry}</span>
                    <span className={`font-medium ${getViabilityColor(idea.aiInsights?.viabilityScore || 0)}`}>
                      Score: {idea.aiInsights?.viabilityScore || 0}%
                    </span>
                  </div>
                  <div className="mt-6 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/app/ideas/${idea._id}`)}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteIdea(idea._id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DashboardPage;
