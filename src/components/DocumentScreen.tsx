import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Upload, FileText, CheckCircle } from 'lucide-react';

interface SummaryResult {
  bulletPoints: string[];
  verdict: string;
}

export function DocumentScreen() {
  const [documentText, setDocumentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setDocumentText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleSummarize = async () => {
    if (!documentText.trim()) return;

    setIsLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockSummary: SummaryResult = {
        bulletPoints: [
          "Company shows strong revenue growth of 15% year-over-year with expanding market share in the technology sector",
          "Debt-to-equity ratio has improved from 0.8 to 0.6, indicating better financial management and reduced leverage risk",
          "Management guidance suggests continued investment in R&D and expansion into emerging markets over the next 2-3 years",
          "Current P/E ratio of 22 is slightly above industry average but justified by above-average growth projections",
          "Recent regulatory changes may impact operating margins in the short term but create long-term competitive advantages"
        ],
        verdict: "Overall positive outlook with moderate risk - suitable for growth-oriented portfolios with 3+ year investment horizon"
      };

      setSummary(mockSummary);
      setIsLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setDocumentText('');
    setSummary(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Analysis
          </CardTitle>
          <CardDescription>
            Upload a file or paste text to get a concise investment analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Upload a document file
            </p>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Choose File
              </Button>
            </label>
          </div>

          <div className="text-center text-muted-foreground">
            <span>or</span>
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <label htmlFor="document-text" className="text-sm">
              Paste document text:
            </label>
            <Textarea
              id="document-text"
              placeholder="Paste your investment document, earnings report, or financial analysis here..."
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSummarize}
              disabled={!documentText.trim() || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Analyzing...' : 'Summarize Document'}
            </Button>
            {documentText && (
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {summary && (
        <div className="space-y-6">
          {/* Key Points */}
          <Card>
            <CardHeader>
              <CardTitle>Key Investment Insights</CardTitle>
              <CardDescription>
                Main points extracted from your document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verdict */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Investment Verdict
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-center">{summary.verdict}</p>
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
              <p className="text-muted-foreground">Analyzing document and extracting key insights...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!summary && !isLoading && !documentText && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Upload a document or paste text to get started with analysis</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}