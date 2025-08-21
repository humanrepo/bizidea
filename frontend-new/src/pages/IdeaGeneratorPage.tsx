import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ideasAPI } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Sparkles, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

const IdeaGeneratorPage: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [experience, setExperience] = useState('');
  const [marketConstraints, setMarketConstraints] = useState<string[]>([]);
  const [generatedIdea, setGeneratedIdea] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGenerateIdea = async () => {
    if (!industry || !interests.length || !budget) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await ideasAPI.generateAI({
        industry,
        interests,
        budget,
        experience,
        marketConstraints
      });
      setGeneratedIdea(response.data);
    } catch (error) {
      console.error('Error generating idea:', error);
      alert('Failed to generate idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIdea = async () => {
    if (!generatedIdea) return;

    try {
      const newIdea = {
        title: generatedIdea.title,
        description: generatedIdea.description,
        industry,
        marketAnalysis: {
          targetMarket: `Users interested in ${industry}`,
          competitors: [],
          marketSize: 0,
          marketTrend: 'Growing',
          score: generatedIdea.viabilityScore
        },
        aiInsights: {
          viabilityScore: generatedIdea.viabilityScore,
          riskFactors: generatedIdea.riskFactors,
          opportunities: generatedIdea.opportunities,
          recommendations: generatedIdea.recommendations
        }
      };

      await ideasAPI.create(newIdea);
      alert('Idea saved successfully!');
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Error saving idea:', error);
      alert('Failed to save idea. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">AI Business Idea Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  value={interests.join(', ')}
                  onChange={(e) => setInterests(e.target.value.split(',').map(s => s.trim()))}
                  placeholder="e.g., AI, Sustainability, Gaming"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., < $1000, $1000-$5000, > $5000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., Beginner, Intermediate, Expert"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketConstraints">Market Constraints (comma-separated)</Label>
                <Input
                  id="marketConstraints"
                  value={marketConstraints.join(', ')}
                  onChange={(e) => setMarketConstraints(e.target.value.split(',').map(s => s.trim()))}
                  placeholder="e.g., Limited budget, High competition"
                />
              </div>

              <Button onClick={handleGenerateIdea} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Idea
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedIdea && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Generated Idea</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{generatedIdea.title}</h3>
                <p className="text-gray-700">{generatedIdea.description}</p>
                <div className="mt-6 flex space-x-4">
                  <Button onClick={handleSaveIdea}>
                    <Save className="mr-2 h-4 w-4" /> Save Idea
                  </Button>
                  <Button variant="outline" onClick={() => setGeneratedIdea(null)}>
                    <X className="mr-2 h-4 w-4" /> Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IdeaGeneratorPage;
