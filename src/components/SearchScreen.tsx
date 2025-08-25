import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Search, ExternalLink } from 'lucide-react';

interface SearchScreenProps {
  initialQuery?: string;
}

interface SearchResult {
  answer: string;
  sources: Array<{
    title: string;
    url: string;
    excerpt: string;
  }>;
}

export function SearchScreen({ initialQuery = '' }: SearchScreenProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResult: SearchResult = {
        answer: `Based on current market analysis, ${query.toLowerCase()} involves several key considerations. Generally speaking, diversification remains crucial for long-term investment success. Market volatility in 2024 has been influenced by geopolitical tensions, inflation concerns, and technological disruptions. 

For investment strategies, consider your risk tolerance, time horizon, and financial goals. Historical data suggests that a balanced portfolio with exposure to both growth and value stocks, along with international diversification, tends to perform well over extended periods.

It's important to conduct thorough research and consider consulting with a financial advisor for personalized investment advice.`,
        sources: [
          {
            title: "Investment Fundamentals Guide 2024",
            url: "https://example.com/investment-guide",
            excerpt: "Comprehensive analysis of current market conditions and investment strategies for retail investors."
          },
          {
            title: "Market Volatility and Portfolio Management",
            url: "https://example.com/portfolio-management",
            excerpt: "Research on how market volatility affects different asset classes and risk management techniques."
          },
          {
            title: "Diversification Strategies for Modern Investors",
            url: "https://example.com/diversification",
            excerpt: "Academic research on optimal portfolio diversification across sectors and geographic regions."
          }
        ]
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question about investing..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={!query.trim() || isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Answer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground">
                {result.answer.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Sources</CardTitle>
              <CardDescription>
                Information compiled from the following sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.sources.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <h4 className="text-sm">{source.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {source.excerpt}
                        </p>
                        <a
                          href={source.url}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Source
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    {index < result.sources.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-muted-foreground">Searching for investment insights...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!result && !isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter a question about investing to get started</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}