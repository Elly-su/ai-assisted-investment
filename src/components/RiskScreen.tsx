import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { AlertTriangle, TrendingUp, Shield } from 'lucide-react';

interface RiskFactors {
  politicalStability: number;
  currencyStability: number;
  legalEnvironment: number;
}

export function RiskScreen() {
  const [riskFactors, setRiskFactors] = useState<RiskFactors>({
    politicalStability: 50,
    currencyStability: 50,
    legalEnvironment: 50,
  });
  const [compositeScore, setCompositeScore] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSliderChange = (factor: keyof RiskFactors, value: number[]) => {
    setRiskFactors(prev => ({
      ...prev,
      [factor]: value[0]
    }));
    setIsCalculated(false);
  };

  const calculateRisk = () => {
    // Calculate weighted composite score
    const weights = {
      politicalStability: 0.4,
      currencyStability: 0.3,
      legalEnvironment: 0.3,
    };

    const score = Math.round(
      riskFactors.politicalStability * weights.politicalStability +
      riskFactors.currencyStability * weights.currencyStability +
      riskFactors.legalEnvironment * weights.legalEnvironment
    );

    setCompositeScore(score);
    setIsCalculated(true);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'text-green-600', icon: Shield };
    if (score >= 60) return { level: 'Moderate Risk', color: 'text-yellow-600', icon: TrendingUp };
    if (score >= 40) return { level: 'High Risk', color: 'text-orange-600', icon: AlertTriangle };
    return { level: 'Very High Risk', color: 'text-red-600', icon: AlertTriangle };
  };

  const resetForm = () => {
    setRiskFactors({
      politicalStability: 50,
      currencyStability: 50,
      legalEnvironment: 50,
    });
    setCompositeScore(null);
    setIsCalculated(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Risk Assessment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Investment Risk Assessment
          </CardTitle>
          <CardDescription>
            Evaluate investment risk based on key environmental factors (0 = Very Poor, 100 = Excellent)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Political Stability */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="political-stability">Political Stability</Label>
              <span className="text-sm px-2 py-1 bg-muted rounded">
                {riskFactors.politicalStability}
              </span>
            </div>
            <Slider
              id="political-stability"
              min={0}
              max={100}
              step={1}
              value={[riskFactors.politicalStability]}
              onValueChange={(value) => handleSliderChange('politicalStability', value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Assess the political climate, government stability, and policy predictability
            </p>
          </div>

          {/* Currency Stability */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="currency-stability">Currency Stability</Label>
              <span className="text-sm px-2 py-1 bg-muted rounded">
                {riskFactors.currencyStability}
              </span>
            </div>
            <Slider
              id="currency-stability"
              min={0}
              max={100}
              step={1}
              value={[riskFactors.currencyStability]}
              onValueChange={(value) => handleSliderChange('currencyStability', value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Evaluate exchange rate volatility, inflation rates, and monetary policy
            </p>
          </div>

          {/* Legal Environment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="legal-environment">Legal Environment</Label>
              <span className="text-sm px-2 py-1 bg-muted rounded">
                {riskFactors.legalEnvironment}
              </span>
            </div>
            <Slider
              id="legal-environment"
              min={0}
              max={100}
              step={1}
              value={[riskFactors.legalEnvironment]}
              onValueChange={(value) => handleSliderChange('legalEnvironment', value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Consider regulatory framework, contract enforcement, and investor protection laws
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={calculateRisk} className="flex-1">
              Calculate Risk Score
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Score Results */}
      {isCalculated && compositeScore !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Composite Risk Score</CardTitle>
            <CardDescription>
              Overall investment risk assessment based on your inputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Gauge */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="text-6xl mb-2">{compositeScore}</div>
                <div className="text-sm text-muted-foreground">out of 100</div>
              </div>
              
              {/* Visual Progress Bar */}
              <div className="space-y-2">
                <Progress value={compositeScore} className="w-full h-4" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>High Risk</span>
                  <span>Low Risk</span>
                </div>
              </div>

              {/* Risk Level Badge */}
              <div className="flex justify-center">
                {(() => {
                  const { level, color, icon: IconComponent } = getRiskLevel(compositeScore);
                  return (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-muted ${color}`}>
                      <IconComponent className="h-4 w-4" />
                      <span>{level}</span>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-4">
              <h4>Score Breakdown</h4>
              <div className="grid gap-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Political Stability</span>
                  <div className="flex items-center gap-2">
                    <Progress value={riskFactors.politicalStability} className="w-24 h-2" />
                    <span className="text-sm w-8 text-right">{riskFactors.politicalStability}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Currency Stability</span>
                  <div className="flex items-center gap-2">
                    <Progress value={riskFactors.currencyStability} className="w-24 h-2" />
                    <span className="text-sm w-8 text-right">{riskFactors.currencyStability}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Legal Environment</span>
                  <div className="flex items-center gap-2">
                    <Progress value={riskFactors.legalEnvironment} className="w-24 h-2" />
                    <span className="text-sm w-8 text-right">{riskFactors.legalEnvironment}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-muted rounded-lg p-4">
              <h5 className="mb-2">Risk Assessment Interpretation</h5>
              <p className="text-sm text-muted-foreground">
                {compositeScore >= 80 && "This investment environment shows strong stability across all factors. Consider for conservative to moderate risk portfolios."}
                {compositeScore >= 60 && compositeScore < 80 && "This investment shows moderate risk with some areas of concern. Suitable for diversified portfolios with appropriate risk management."}
                {compositeScore >= 40 && compositeScore < 60 && "This investment carries elevated risk that requires careful consideration. Only suitable for high-risk tolerance investors."}
                {compositeScore < 40 && "This investment environment presents significant risks across multiple factors. Exercise extreme caution and consider avoiding or limiting exposure."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isCalculated && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Adjust the risk factors above and click "Calculate Risk Score" to see your assessment</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}