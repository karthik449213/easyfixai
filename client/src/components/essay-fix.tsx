import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, CheckCircle, Zap, Filter, Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ToneType = "formal" | "friendly" | "persuasive";

interface MockImprovement {
  original: string;
  improved: string;
}

const mockImprovements: Record<ToneType, MockImprovement> = {
  formal: {
    original: "The internet has changed how we communicate. People use social media to talk to friends and family. This has good and bad effects on society.",
    improved: "The advent of the internet has <mark class='highlight-yellow px-1 rounded' title='Enhanced: revolutionized'>revolutionized</mark> the <mark class='highlight-yellow px-1 rounded' title='Enhanced: methodologies by which'>methodologies by which</mark> we communicate. <mark class='highlight-yellow px-1 rounded' title='Enhanced: Contemporary individuals'>Contemporary individuals</mark> utilize social media platforms to <mark class='highlight-yellow px-1 rounded' title='Enhanced: establish and maintain connections'>establish and maintain connections</mark> with friends and family members. This technological advancement has yielded both <mark class='highlight-yellow px-1 rounded' title='Enhanced: beneficial and detrimental consequences'>beneficial and detrimental consequences</mark> for society."
  },
  friendly: {
    original: "The internet has changed how we communicate. People use social media to talk to friends and family. This has good and bad effects on society.",
    improved: "The internet has <mark class='highlight-blue px-1 rounded' title='Enhanced: totally transformed'>totally transformed</mark> how we stay in touch with each other. <mark class='highlight-blue px-1 rounded' title='Enhanced: Nowadays, folks'>Nowadays, folks</mark> turn to social media to <mark class='highlight-blue px-1 rounded' title='Enhanced: chat and catch up'>chat and catch up</mark> with friends and family. <mark class='highlight-blue px-1 rounded' title='Enhanced: While this brings some amazing benefits, it also comes with its fair share of challenges'>While this brings some amazing benefits, it also comes with its fair share of challenges</mark> for our society."
  },
  persuasive: {
    original: "The internet has changed how we communicate. People use social media to talk to friends and family. This has good and bad effects on society.",
    improved: "The internet has <mark class='highlight-green px-1 rounded' title='Enhanced: fundamentally transformed'>fundamentally transformed</mark> our communication landscape. <mark class='highlight-green px-1 rounded' title='Enhanced: Millions of people worldwide'>Millions of people worldwide</mark> now rely on social media platforms to <mark class='highlight-green px-1 rounded' title='Enhanced: forge meaningful connections'>forge meaningful connections</mark> with friends and family. <mark class='highlight-green px-1 rounded' title='Enhanced: While this digital revolution brings unprecedented opportunities for connection, we must also confront the significant challenges it poses to our social fabric'>While this digital revolution brings unprecedented opportunities for connection, we must also confront the significant challenges it poses to our social fabric</mark>."
  }
};

export function EssayFix() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [essayText, setEssayText] = useState("");
  const [tone, setTone] = useState<ToneType>("formal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [improvedEssay, setImprovedEssay] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Set sample text on component mount
  useEffect(() => {
    const sampleText = "The internet has changed how we communicate. People use social media to talk to friends and family. This has good and bad effects on society.";
    setTimeout(() => {
      setEssayText(sampleText);
    }, 1000);
  }, []);

  const handleFixEssay = async () => {
    if (!essayText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your essay text first!",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setShowResult(false);

    // TODO: Integrate GPT or AI API here
    // Simulate processing delay
    setTimeout(() => {
      const mockData = mockImprovements[tone];
      setImprovedEssay(mockData.improved);
      setShowResult(true);
      setIsProcessing(false);
      
      // Scroll to results
      setTimeout(() => {
        const resultSection = document.getElementById("result-section");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }, 2000);
  };

  const handleCopyEssay = async () => {
    if (!improvedEssay) return;
    
    // Strip HTML tags for plain text copy
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = improvedEssay;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    
    try {
      await navigator.clipboard.writeText(plainText);
      setIsCopied(true);
      toast({
        title: "Success",
        description: "Essay copied to clipboard!",
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Error",
        description: "Failed to copy essay to clipboard",
        variant: "destructive",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white dark:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-600"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </Button>
      </div>

      {/* Floating Ad Placeholders */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="w-32 h-96 bg-gray-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm text-center">
            Ad Space<br />160x600
          </span>
        </div>
      </div>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="w-32 h-96 bg-gray-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm text-center">
            Ad Space<br />160x600
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4">
            Essay<span className="text-academic-blue">Fix</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enhance your essays with AI-powered rewriting. Get better grades with zero plagiarism.
          </p>
        </div>

        {/* Main Application */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="shadow-xl border border-gray-200 dark:border-slate-600">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-white mb-6">
                  Original Essay
                </h2>

                {/* Controls */}
                <div className="mb-6">
                  <Label htmlFor="tone-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Writing Tone
                  </Label>
                  <Select value={tone} onValueChange={(value: ToneType) => setTone(value)}>
                    <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal Academic</SelectItem>
                      <SelectItem value="friendly">Friendly & Conversational</SelectItem>
                      <SelectItem value="persuasive">Persuasive & Compelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Essay Input */}
                <div className="mb-6">
                  <Label htmlFor="essay-input" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paste your essay here
                  </Label>
                  <Textarea
                    id="essay-input"
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    className="h-80 resize-none bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
                    placeholder="Enter your essay text here..."
                  />
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{essayText.length}</span> characters
                  </div>
                </div>

                {/* Fix Button */}
                <Button
                  onClick={handleFixEssay}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-academic-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      ✨ Fix My Essay
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="shadow-xl border border-gray-200 dark:border-slate-600" id="result-section">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">
                    Improved Essay
                  </h2>
                  {showResult && (
                    <Badge className="bg-success text-white hover:bg-success/80">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      99% Unique ✓
                    </Badge>
                  )}
                </div>

                {/* Output Content */}
                {showResult ? (
                  <div>
                    <div
                      className="h-80 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg overflow-y-auto mb-4 border border-gray-200 dark:border-slate-600"
                      dangerouslySetInnerHTML={{ __html: improvedEssay }}
                    />
                    <Button
                      onClick={handleCopyEssay}
                      className="w-full bg-gray-900 dark:bg-slate-600 hover:bg-gray-800 dark:hover:bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-5 w-5" />
                          Copy Improved Essay
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  /* Placeholder */
                  <div className="h-80 flex items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">Your improved essay will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg border border-gray-200 dark:border-slate-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-academic-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Zero Plagiarism
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  100% original content with our advanced AI rewriting technology
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg border border-gray-200 dark:border-slate-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Instant Results
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get your improved essay in seconds, not hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg border border-gray-200 dark:border-slate-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Enhancement
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-powered improvements for clarity, flow, and academic tone
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-900 text-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg font-bold font-serif mb-2">EssayFix</p>
            <p className="text-gray-400 text-sm mb-4">
              <strong>Disclaimer:</strong> This tool is for academic improvement only. Always follow your institution's academic integrity policies.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
