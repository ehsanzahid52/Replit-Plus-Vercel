import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import SignalsApp from "@/pages/signals-app";
import Results from "@/pages/results";
import MonthDetails from "@/pages/month-details";
import Analysis from "@/pages/analysis";
import AnalysisArticle from "@/pages/analysis-article";
import AnalysisTag from "@/pages/analysis-tag";
import Tools from "@/pages/tools";
import PositionSizeCalculator from "@/pages/tools/position-size-calculator";
import PipCalculator from "@/pages/tools/pip-calculator";
import MarginCalculator from "@/pages/tools/margin-calculator";
import FibonacciCalculator from "@/pages/tools/fibonacci-calculator";
import PivotCalculator from "@/pages/tools/pivot-calculator";
import RiskOfRuinCalculator from "@/pages/tools/risk-of-ruin-calculator";
import LeverageCalculator from "@/pages/tools/leverage-calculator";
import CompoundingCalculator from "@/pages/tools/compounding-calculator";
import DrawdownCalculator from "@/pages/tools/drawdown-calculator";
import RebateCalculator from "@/pages/tools/rebate-calculator";
import CurrencyConverter from "@/pages/tools/currency-converter";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Support from "@/pages/support";
import { Suspense } from "react";
import LanguageRouter from "@/components/LanguageRouter";
import { supportedLanguages } from "./i18n";

function Router() {
  return (
    <Switch>
      {/* Language-specific routes */}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={lang} path={`/${lang}`} component={Landing} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-signals`} path={`/${lang}/signals-app`} component={SignalsApp} />
      ))}
      
      {/* Results routes for each language */}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-results`} path={`/${lang}/results`} component={Results} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-month-details`} path={`/${lang}/results/:monthYear`} component={MonthDetails} />
      ))}
      
      {/* Analysis routes for each language */}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-analysis`} path={`/${lang}/analysis`} component={Analysis} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-analysis-tag`} path={`/${lang}/analysis/tags/:tagSlug`} component={AnalysisTag} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-analysis-article`} path={`/${lang}/analysis/:slug`} component={AnalysisArticle} />
      ))}
      
      {/* Section routes for each language */}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-tools`} path={`/${lang}/tools`} component={Tools} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-position-calc`} path={`/${lang}/tools/position-size-calculator`} component={PositionSizeCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-pip-calc`} path={`/${lang}/tools/pip-calculator`} component={PipCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-margin-calc`} path={`/${lang}/tools/margin-calculator`} component={MarginCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-fibonacci-calc`} path={`/${lang}/tools/fibonacci-calculator`} component={FibonacciCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-pivot-calc`} path={`/${lang}/tools/pivot-calculator`} component={PivotCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-risk-calc`} path={`/${lang}/tools/risk-of-ruin-calculator`} component={RiskOfRuinCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-leverage-calc`} path={`/${lang}/tools/leverage-calculator`} component={LeverageCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-compound-calc`} path={`/${lang}/tools/compounding-calculator`} component={CompoundingCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-drawdown-calc`} path={`/${lang}/tools/drawdown-calculator`} component={DrawdownCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-rebate-calc`} path={`/${lang}/tools/rebate-calculator`} component={RebateCalculator} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-currency-conv`} path={`/${lang}/tools/currency-converter`} component={CurrencyConverter} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-pricing`} path={`/${lang}/pricing`} component={Landing} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-support`} path={`/${lang}/support`} component={Support} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-performance`} path={`/${lang}/performance`} component={Landing} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-privacy`} path={`/${lang}/privacy`} component={Privacy} />
      ))}
      {Object.keys(supportedLanguages).map(lang => (
        <Route key={`${lang}-terms`} path={`/${lang}/terms`} component={Terms} />
      ))}
      
      {/* Fallback routes for backward compatibility */}
      <Route path="/" component={Landing} />
      <Route path="/signals-app" component={SignalsApp} />
      <Route path="/results" component={Results} />
      <Route path="/results/:monthYear" component={MonthDetails} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/analysis/tags/:tagSlug" component={AnalysisTag} />
      <Route path="/analysis/:slug" component={AnalysisArticle} />
      <Route path="/tools" component={Tools} />
      <Route path="/tools/position-size-calculator" component={PositionSizeCalculator} />
      <Route path="/tools/pip-calculator" component={PipCalculator} />
      <Route path="/tools/margin-calculator" component={MarginCalculator} />
      <Route path="/tools/fibonacci-calculator" component={FibonacciCalculator} />
      <Route path="/tools/pivot-calculator" component={PivotCalculator} />
      <Route path="/tools/risk-of-ruin-calculator" component={RiskOfRuinCalculator} />
      <Route path="/tools/leverage-calculator" component={LeverageCalculator} />
      <Route path="/tools/compounding-calculator" component={CompoundingCalculator} />
      <Route path="/tools/drawdown-calculator" component={DrawdownCalculator} />
      <Route path="/tools/rebate-calculator" component={RebateCalculator} />
      <Route path="/tools/currency-converter" component={CurrencyConverter} />
      <Route path="/pricing" component={Landing} />
      <Route path="/support" component={Support} />
      <Route path="/performance" component={Landing} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageRouter>
            <Toaster />
            <Router />
          </LanguageRouter>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
