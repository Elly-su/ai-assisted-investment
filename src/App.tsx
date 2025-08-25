import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { DocumentScreen } from './components/DocumentScreen';
import { RiskScreen } from './components/RiskScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchFromHome = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const handleNavigateToDocument = () => {
    setActiveTab('document');
  };

  const handleNavigateToRisk = () => {
    setActiveTab('risk');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="mb-2">Investment Research Assistant</h1>
          <p className="text-muted-foreground">
            Analyze investments, summarize documents, and assess risk scores
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeScreen 
              onSearch={handleSearchFromHome}
              onNavigateToDocument={handleNavigateToDocument}
              onNavigateToRisk={handleNavigateToRisk}
            />
          </TabsContent>

          <TabsContent value="search">
            <SearchScreen initialQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="document">
            <DocumentScreen />
          </TabsContent>

          <TabsContent value="risk">
            <RiskScreen />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}