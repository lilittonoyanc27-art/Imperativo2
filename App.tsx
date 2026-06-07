/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Star, 
  MessageSquare, 
  Shuffle, 
  Layers, 
  Flag,
  Languages,
  BookMarked,
  Volume2,
  Info,
  RefreshCw,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  THEORY_CONTENT,
  MATCH_PAIRS_DATA,
  CONJUGATION_QUESTIONS,
  SORT_CARDS_DATA,
  DIALOGUE_STEPS,
  PUZZLE_ITEMS,
  MatchItem,
  ConjugationQuestion,
  SortCard,
  DialogueStep,
  PuzzleItem
} from './data';

export default function App() {
  // Global Navigation & Progress State
  const [activeTab, setActiveTab] = useState<'theory' | 'games'>('theory');
  const [activeGame, setActiveGame] = useState<number>(1);
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('es_imperativo_stars');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [completedGames, setCompletedGames] = useState<string[]>(() => {
    const saved = localStorage.getItem('es_imperativo_completed');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep track of stars and completed games in local storage
  useEffect(() => {
    localStorage.setItem('es_imperativo_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('es_imperativo_completed', JSON.stringify(completedGames));
  }, [completedGames]);

  const addStars = (amount: number) => {
    setStars(prev => prev + amount);
  };

  const markGameCompleted = (gameKey: string) => {
    if (!completedGames.includes(gameKey)) {
      setCompletedGames(prev => [...prev, gameKey]);
      addStars(10); // Reward for game completion
    }
  };

  const resetAllProgress = () => {
    if (window.confirm('Ցանկանո՞ւմ եք զրոյացնել ձեր ամբողջ առաջընթացը և աստղերը:')) {
      setStars(0);
      setCompletedGames([]);
      localStorage.removeItem('es_imperativo_stars');
      localStorage.removeItem('es_imperativo_completed');
      // Reload current states
      setSelectedMatchItem(null);
      setMatchedPairIds([]);
      setWrongMatchIds([]);
      setCurrentGapIndex(0);
      setGapAnswered(false);
      setGapSelectedOption(null);
      setSortCards(shuffleArray([...SORT_CARDS_DATA]));
      setSortIndex(0);
      setSortState(null);
      setDialogueIndex(0);
      setDialogueAnswered(false);
      setDialogueSelected(null);
      setPuzzleIndex(0);
      setPuzzleSelectedTokens([]);
      setPuzzleFeedback(null);
    }
  };

  // Helper shuffle
  function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  // ==========================================
  // GAME 1 STATES & LOGIC: Match the Pairs
  // ==========================================
  const [matchItems, setMatchItems] = useState<MatchItem[]>(() => 
    shuffleArray([...MATCH_PAIRS_DATA])
  );
  const [selectedMatchItem, setSelectedMatchItem] = useState<MatchItem | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]); // pairIds that are successfully matched
  const [wrongMatchIds, setWrongMatchIds] = useState<string[]>([]); // active pairs that failed
  const [game1Explanation, setGame1Explanation] = useState<string>('');

  const handleMatchSelect = (item: MatchItem) => {
    // If already matched, do nothing
    if (matchedPairIds.includes(item.pairId)) return;

    if (!selectedMatchItem) {
      setSelectedMatchItem(item);
      setWrongMatchIds([]);
      setGame1Explanation('');
      return;
    }

    // If clicking same card, deselect
    if (selectedMatchItem.id === item.id) {
      setSelectedMatchItem(null);
      return;
    }

    // If clicking same language type, switch selection
    if (selectedMatchItem.lang === item.lang) {
      setSelectedMatchItem(item);
      return;
    }

    // Check match
    if (selectedMatchItem.pairId === item.pairId) {
      // Success match
      setMatchedPairIds(prev => [...prev, item.pairId]);
      addStars(3);
      setSelectedMatchItem(null);
      // Give details of the match
      const basePair = MATCH_PAIRS_DATA.find(x => x.pairId === item.pairId && x.lang === 'esp');
      const armPair = MATCH_PAIRS_DATA.find(x => x.pairId === item.pairId && x.lang === 'arm');
      setGame1Explanation(`Ճիշտ է։ «${basePair?.text}» = «${armPair?.text}»`);

      // Check if all matched
      if (matchedPairIds.length + 1 === MATCH_PAIRS_DATA.length / 2) {
        markGameCompleted('game1');
      }
    } else {
      // Wrong match
      setWrongMatchIds([selectedMatchItem.id, item.id]);
      setSelectedMatchItem(null);
      setGame1Explanation('Սխալ զուգորդում, փորձեք նորից:');
      setTimeout(() => {
        setWrongMatchIds([]);
      }, 1000);
    }
  };

  const resetGame1 = () => {
    setMatchItems(shuffleArray([...MATCH_PAIRS_DATA]));
    setSelectedMatchItem(null);
    setMatchedPairIds([]);
    setWrongMatchIds([]);
    setGame1Explanation('');
  };


  // ==========================================
  // GAME 2 STATES & LOGIC: Fill-In-The-Gap
  // ==========================================
  const [currentGapIndex, setCurrentGapIndex] = useState(0);
  const [gapAnswered, setGapAnswered] = useState(false);
  const [gapSelectedOption, setGapSelectedOption] = useState<string | null>(null);

  const currentGapQuestion = CONJUGATION_QUESTIONS[currentGapIndex];

  const handleGapAnswer = (option: string) => {
    if (gapAnswered) return;
    setGapSelectedOption(option);
    setGapAnswered(true);

    if (option === currentGapQuestion.correctAnswer) {
      addStars(5);
    }
  };

  const handleNextGap = () => {
    if (currentGapIndex + 1 < CONJUGATION_QUESTIONS.length) {
      setCurrentGapIndex(prev => prev + 1);
      setGapAnswered(false);
      setGapSelectedOption(null);
    } else {
      markGameCompleted('game2');
    }
  };

  const resetGame2 = () => {
    setCurrentGapIndex(0);
    setGapAnswered(false);
    setGapSelectedOption(null);
  };


  // ==========================================
  // GAME 3 STATES & LOGIC: Afirmativo vs Negativo Sorter
  // ==========================================
  const [sortCards, setSortCards] = useState<SortCard[]>(() =>
    shuffleArray([...SORT_CARDS_DATA])
  );
  const [sortIndex, setSortIndex] = useState(0);
  const [sortState, setSortState] = useState<{
    selected: 'afirmativo' | 'negativo';
    isCorrect: boolean;
  } | null>(null);

  const currentSortCard = sortCards[sortIndex];

  const handleSortSelection = (target: 'afirmativo' | 'negativo') => {
    if (sortState) return; // Wait for next card click
    const correct = currentSortCard.type === target;
    setSortState({
      selected: target,
      isCorrect: correct
    });

    if (correct) {
      addStars(4);
    }
  };

  const handleNextSort = () => {
    if (sortIndex + 1 < sortCards.length) {
      setSortIndex(prev => prev + 1);
      setSortState(null);
    } else {
      markGameCompleted('game3');
    }
  };

  const resetGame3 = () => {
    setSortCards(shuffleArray([...SORT_CARDS_DATA]));
    setSortIndex(0);
    setSortState(null);
  };


  // ==========================================
  // GAME 4 STATES & LOGIC: Dialogue completion
  // ==========================================
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueAnswered, setDialogueAnswered] = useState(false);
  const [dialogueSelected, setDialogueSelected] = useState<string | null>(null);

  const currentDiagStep = DIALOGUE_STEPS[dialogueIndex];

  const handleDialogueSelect = (opt: string) => {
    if (dialogueAnswered) return;
    setDialogueSelected(opt);
    setDialogueAnswered(true);

    if (opt === currentDiagStep.correctValue) {
      addStars(6);
    }
  };

  const handleNextDialogue = () => {
    if (dialogueIndex + 1 < DIALOGUE_STEPS.length) {
      setDialogueIndex(prev => prev + 1);
      setDialogueAnswered(false);
      setDialogueSelected(null);
    } else {
      markGameCompleted('game4');
    }
  };

  const resetGame4 = () => {
    setDialogueIndex(0);
    setDialogueAnswered(false);
    setDialogueSelected(null);
  };


  // ==========================================
  // GAME 5 STATES & LOGIC: Sentence Puzzle Constructor
  // ==========================================
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzleSelectedTokens, setPuzzleSelectedTokens] = useState<string[]>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<{
    checked: boolean;
    isCorrect: boolean;
  } | null>(null);

  const currentPuzzle = PUZZLE_ITEMS[puzzleIndex];

  const handleTokenClick = (token: string) => {
    if (puzzleFeedback?.checked) return;
    setPuzzleSelectedTokens(prev => [...prev, token]);
  };

  const handleRemoveToken = (index: number) => {
    if (puzzleFeedback?.checked) return;
    setPuzzleSelectedTokens(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleCheckPuzzleAnswer = () => {
    if (puzzleSelectedTokens.length === 0 || puzzleFeedback?.checked) return;
    
    // Check if lengths and items match
    const isCorrect = 
      JSON.stringify(puzzleSelectedTokens) === JSON.stringify(currentPuzzle.correctSentence);

    setPuzzleFeedback({
      checked: true,
      isCorrect
    });

    if (isCorrect) {
      addStars(8);
    }
  };

  const handleNextPuzzle = () => {
    if (puzzleIndex + 1 < PUZZLE_ITEMS.length) {
      setPuzzleIndex(prev => prev + 1);
      setPuzzleSelectedTokens([]);
      setPuzzleFeedback(null);
    } else {
      markGameCompleted('game5');
    }
  };

  const resetGame5 = () => {
    setPuzzleIndex(0);
    setPuzzleSelectedTokens([]);
    setPuzzleFeedback(null);
  };

  // Helper score count for current session statistics
  const gamesList = [
    { id: 1, name: 'Զույգերի Միացում', key: 'game1', icon: '🧩', difficulty: 'Հեշտ' },
    { id: 2, name: 'Բայերի Խոնարհում', key: 'game2', icon: '✍️', difficulty: 'Միջին' },
    { id: 3, name: 'Դրական թե Բացասական', key: 'game3', icon: '⚖️', difficulty: 'Հեշտ' },
    { id: 4, name: 'Իրավիճակային Դիալոգներ', key: 'game4', icon: '💬', difficulty: 'Բարդ' },
    { id: 5, name: 'Նախադասության Կառուցում', key: 'game5', icon: '🧱', difficulty: 'Բարդ' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-white relative overflow-hidden">
      {/* Visual background atmospheric glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-950/10 blur-[130px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-925/80 backdrop-blur-md border-b border-slate-800/65 shadow-lg shadow-slate-950/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/20">
              🇪🇸
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 tracking-tight font-display flex items-center gap-2">
                Imperativo <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium px-2 py-0.5 rounded-full font-sans">Իսպաներեն</span>
              </h1>
              <p className="text-xs text-slate-400 font-sans">Հրամայական եղանակի տեսություն և ինտերակտիվ խաղեր</p>
            </div>
          </div>

          {/* Stars Tracker and Global Reset */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner shadow-amber-500/5">
              <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-500 animate-pulse" />
              <div className="text-sm font-semibold text-amber-300">
                <span className="font-mono">{stars}</span> <span className="text-xs text-amber-500/80">Աստղ</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs text-indigo-300 font-medium font-sans">
              <Award className="h-4 w-4 text-indigo-400" />
              <span>Ավարտված՝ {completedGames.length}/{gamesList.length} խաղ</span>
            </div>

            <button
              onClick={resetAllProgress}
              title="Զրոյացնել ամբողջը"
              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-900/60 rounded-full transition-all"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation Bar */}
        <div className="border-t border-slate-800/80 bg-slate-900/10">
          <div className="max-w-6xl mx-auto px-4 flex gap-1">
            <button
              id="tab-btn-theory"
              onClick={() => setActiveTab('theory')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'theory'
                  ? 'border-orange-500 text-orange-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>📖 Տեսական Բաժին</span>
            </button>
            <button
              id="tab-btn-games"
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'games'
                  ? 'border-orange-500 text-orange-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>🎮 Պրակտիկ Խաղեր</span>
              {completedGames.length === gamesList.length && (
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'theory' ? (
            <motion.div
              key="theory-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden max-w-3xl mx-auto"
            >
              <div className="border-b border-slate-800/80 bg-slate-925/40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-orange-400" />
                  <span className="font-semibold text-slate-100 text-sm">Ուսումնական Նյութեր</span>
                </div>
                <div className="text-xs bg-orange-550/10 text-orange-400 border border-orange-500/20 font-medium px-2 py-1 rounded">
                  ARM / ESP
                </div>
              </div>

              {/* Exact user text rendered beautifully with targeted CSS overrides for dark theme scale */}
              <div 
                id="theory-content-body"
                className="prose prose-invert max-w-none p-6 sm:p-8 text-slate-300 space-y-6 
                           [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:font-display [&>h2]:border-b [&>h2]:border-slate-800/80 [&>h2]:pb-2
                           [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-orange-400 [&>h3]:font-display [&>h3]:mt-6 [&>h3]:pt-4
                           [&>h4]:text-sm [&>h4]:font-semibold [&>h4]:text-amber-300
                           [&>p]:leading-relaxed [&>p]:text-slate-300
                           [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul_li]:text-slate-300
                           [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>ol_li]:text-slate-300
                           [&_strong]:text-white [&_strong]:font-semibold
                           [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:border [&_table]:border-slate-800/50
                           [&_thead]:bg-slate-925/60 [&_thead]:text-slate-200 [&_th]:p-2.5 [&_th]:font-semibold [&_th]:border-b [&_th]:border-slate-850 [&_th]:text-left
                           [&_tbody]:divide-y [&_tbody]:divide-slate-850/50 [&_td]:p-2.5 [&_td]:text-slate-300 [&_td]:font-light
                           [&_hr]:border-t [&_hr]:border-dashed [&_hr]:border-slate-800 [&_hr]:my-8"
                dangerouslySetInnerHTML={{ __html: THEORY_CONTENT }}
              />

              <div className="bg-gradient-to-r from-orange-950/20 via-slate-900/40 to-orange-950/10 border-t border-slate-800/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0 animate-pulse">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100 text-sm">Պատրա՞ստ եք պրակտիկայի</h4>
                    <p className="text-xs text-slate-400">Յուրացրե՛ք տեսությունը և փորձարկեք ձեր գիտելիքները 5 ինտերակտիվ խաղերում:</p>
                  </div>
                </div>
                <button
                  id="start-games-footer-btn"
                  onClick={() => setActiveTab('games')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl shadow-md shadow-orange-500/10 text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:translate-x-1 cursor-pointer"
                >
                  <span>Անցնել խաղերին</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="games-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Game Selector Sidebar */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border border-slate-800/80">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">5 Ուսուցողական Խաղ</h3>
                  <div className="space-y-2">
                    {gamesList.map((g) => {
                      const isCompleted = completedGames.includes(g.key);
                      const isActive = activeGame === g.id;

                      return (
                        <button
                          key={g.id}
                          id={`game-select-btn-${g.id}`}
                          onClick={() => setActiveGame(g.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all relative cursor-pointer border ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 border-orange-400/30'
                              : 'bg-slate-950/40 hover:bg-slate-950/80 text-slate-300 border-slate-850 hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{g.icon}</span>
                            <div>
                              <div className="font-bold text-xs sm:text-sm leading-tight">{g.name}</div>
                              <span className={`text-[10px] ${isActive ? 'text-orange-100' : 'text-slate-500'}`}>
                                Խաղ {g.id} • {g.difficulty}
                              </span>
                            </div>
                          </div>

                          {isCompleted ? (
                            <CheckCircle2 className={`h-4 w-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                          ) : (
                            <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-orange-200 animate-ping' : 'bg-slate-700'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900/40 backdrop-blur-md text-white p-4 rounded-xl shadow-lg border border-indigo-500/25 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 text-[80px] pointer-events-none select-none font-bold">
                    ES
                  </div>
                  <h4 className="font-bold text-xs tracking-wider uppercase text-indigo-300 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                    <span>Աստղային առաքելություն</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-light">
                    Ամեն ճիշտ պատասխանի համար դուք ստանում եք լրացուցիչ աստղեր, իսկ յուրաքանչյուր խաղ ամբողջությամբ ավարտելիս՝ +10 աստղ պոնուս։
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-indigo-300 border-t border-indigo-900/60 pt-2.5">
                    <span className="text-slate-400">Ձեր ընդհանուրը՝</span>
                    <span className="text-amber-400 font-bold">{stars} ⭐</span>
                  </div>
                </div>
              </div>

              {/* Active Game Container Area */}
              <div className="lg:col-span-9">
                <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl min-h-[460px] flex flex-col">
                  
                  {/* Game Container Header */}
                  <div className="bg-slate-925/40 px-6 py-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">ԽԱՂ {activeGame}</div>
                      <h2 className="text-lg font-bold text-slate-100 font-display">
                        {gamesList.find(x => x.id === activeGame)?.name}
                      </h2>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (activeGame === 1) resetGame1();
                          if (activeGame === 2) resetGame2();
                          if (activeGame === 3) resetGame3();
                          if (activeGame === 4) resetGame4();
                          if (activeGame === 5) resetGame5();
                        }}
                        className="px-3 py-1.5 text-xs text-slate-300 bg-slate-950/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-950/80 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Վերսկսել</span>
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE GAME 1: PHRASE MATCHER */}
                   {activeGame === 1 && (
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-xs px-4 py-3 rounded-xl mb-6 font-sans">
                          👉 <strong>Ինչպե՞ս խաղալ.</strong> Միացրեք հայերեն հրամայական արտահայտությունը իր համապատասխան իսպաներեն թարգմանության հետ։ Միացնելու համար սեղմեք հաջորդաբար երկու լեզուների վրա։
                        </div>

                        {/* Matching pairs grids */}
                        <div className="grid grid-cols-2 gap-4 my-6">
                          {/* Match column */}
                          <div className="grid grid-cols-1 gap-2">
                            {matchItems.map((item) => {
                              const isMatched = matchedPairIds.includes(item.pairId);
                              const isSelected = selectedMatchItem?.id === item.id;
                              const isWrong = wrongMatchIds.includes(item.id);

                              return (
                                <button
                                  key={item.id}
                                  id={`match-btn-${item.id}`}
                                  disabled={isMatched}
                                  onClick={() => handleMatchSelect(item)}
                                  className={`p-3 text-xs sm:text-sm rounded-xl border text-left transition-all min-h-[56px] flex items-center justify-between cursor-pointer ${
                                    isMatched
                                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 cursor-not-allowed opacity-80'
                                      : isSelected
                                      ? 'bg-orange-500/20 border-orange-500 ring-2 ring-orange-500/35 text-white font-semibold'
                                      : isWrong
                                      ? 'bg-rose-500/20 border-rose-500 text-rose-200 animate-shake'
                                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80 text-slate-300'
                                  }`}
                                >
                                  <span>{item.text}</span>
                                  {isMatched && <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          {/* Match Indicator Screen or Extra visuals on match */}
                          <div className="flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800/80 text-center">
                            {game1Explanation ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-2"
                              >
                                <div className="text-4xl">🎉</div>
                                <p className="text-sm font-semibold text-slate-100 mt-1">{game1Explanation}</p>
                                <p className="text-[11px] text-slate-500">Շարունակե՛ք միացնել մյուսները</p>
                              </motion.div>
                            ) : (
                              <p className="text-xs text-slate-500 px-4">
                                Ընտրեք հայերեն և իսպաներեն զույգերը
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Game 1 Complete message */}
                      {matchedPairIds.length === MATCH_PAIRS_DATA.length / 2 && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
                          <StarsBadge size="lg" />
                          <h3 className="font-bold text-emerald-300 text-lg">Հիանալի է։ Բոլոր զույգերը միացված են։</h3>
                          <p className="text-xs text-slate-300 max-w-md mx-auto">
                            Դուք հաջողությամբ յուրացրեցիք հիմնական դրական, բացասական, անկանոն և վերադարձական հրամայականները։
                          </p>
                          <button
                            id="next-game1-finish-btn"
                            onClick={() => {
                              setActiveGame(2);
                              resetGame2();
                            }}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
                          >
                            <span>Հաջորդ խաղը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ACTIVE GAME 2: FILL-IN-THE-GAP CONJUGATOR */}
                  {activeGame === 2 && (
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Progress Bar indicator */}
                        <div className="w-full bg-slate-800/40 h-1.5 rounded-full overflow-hidden mb-6 flex gap-0.5">
                          {CONJUGATION_QUESTIONS.map((q, idx) => (
                            <div
                              key={q.id}
                              className={`flex-1 h-full transition-all ${
                                idx < currentGapIndex
                                  ? 'bg-emerald-500'
                                  : idx === currentGapIndex
                                  ? 'bg-orange-500 animate-pulse'
                                  : 'bg-slate-800'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Top Context Cards */}
                        <div className="bg-orange-950/15 border border-orange-500/25 p-4 rounded-xl mb-6">
                          <div className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">ՀԱՐՑ {currentGapIndex + 1} / {CONJUGATION_QUESTIONS.length}</div>
                          <h4 className="text-base font-semibold text-slate-100 mt-1">
                            {currentGapQuestion.armenianSentence}
                          </h4>
                          <span className="inline-block bg-slate-950/60 text-slate-300 font-mono text-xs px-2.5 py-1 rounded-md mt-2 border border-slate-800/80">
                            Բայ՝ {currentGapQuestion.helperSpan}
                          </span>
                        </div>

                        {/* Large Prompt Card */}
                        <div className="bg-slate-950/60 border border-slate-850 p-8 rounded-2xl text-center my-6 shadow-inner">
                          <p className="text-2xl font-bold font-display text-white tracking-wide">
                            {currentGapQuestion.promptText.replace('____', '______')}
                          </p>
                        </div>

                        {/* Multiple Choice Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                          {currentGapQuestion.options.map((opt) => {
                            const isSelected = gapSelectedOption === opt;
                            const isCorrectOpt = opt === currentGapQuestion.correctAnswer;
                            let btnStyle = 'border-slate-800 bg-slate-950/40 hover:border-indigo-505 hover:bg-indigo-950/20 text-slate-300';

                            if (gapAnswered) {
                              if (isCorrectOpt) {
                                btnStyle = 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/10';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-600 border-rose-500 text-white font-semibold shadow-md shadow-rose-500/10 animate-shake';
                              } else {
                                btnStyle = 'bg-slate-950/20 border-slate-900 opacity-30 text-slate-500';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                id={`choice-gap-btn-${opt}`}
                                disabled={gapAnswered}
                                onClick={() => handleGapAnswer(opt)}
                                className={`p-4 text-left rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                              >
                                <span className="font-semibold font-mono text-slate-200">{opt}</span>
                                {gapAnswered && isCorrectOpt && <Check className="h-4 w-4 text-white" />}
                                {gapAnswered && isSelected && !isCorrectOpt && <XCircle className="h-4 w-4 text-white animate-pulse" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Grammar Explanation Box after answering */}
                        {gapAnswered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl border mt-4 text-xs ${
                              gapSelectedOption === currentGapQuestion.correctAnswer
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                                : 'bg-rose-950/20 border-rose-500/30 text-slate-300'
                            }`}
                          >
                            <h5 className="font-bold mb-1 flex items-center gap-1 text-sm">
                              {gapSelectedOption === currentGapQuestion.correctAnswer ? (
                                <span className="text-emerald-400">🟢 Ճիշտ է։</span>
                              ) : (
                                <span className="text-rose-400">🔴 Սխալ պատասխան։</span>
                              )}
                              <span className="text-slate-200">Բացատրություն՝</span>
                            </h5>
                            <p className="leading-relaxed text-slate-300">
                              {currentGapQuestion.explanationArm}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Control buttons */}
                      <div className="mt-8 flex justify-end">
                        {gapAnswered && (
                          <button
                            id="next-gap-btn"
                            onClick={handleNextGap}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                          >
                            <span>
                              {currentGapIndex + 1 < CONJUGATION_QUESTIONS.length
                                ? 'Հաջորդ հարցը'
                                : 'Ավարտել և ստանալ աստղեր'}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Complete state */}
                      {completedGames.includes('game2') && currentGapIndex + 1 === CONJUGATION_QUESTIONS.length && gapAnswered && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4 mt-6">
                          <StarsBadge size="lg" />
                          <h3 className="font-bold text-emerald-300 text-lg">Շնորհավորում ենք:</h3>
                          <p className="text-xs text-slate-300">
                            Դուք ճիշտ խոնարհեցիք բոլոր բայերը և սովորեցիք «tú» անկանոն ու «usted» քաղաքավարի ձևերի տարբերությունները:
                          </p>
                          <button
                            id="to-game3-btn"
                            onClick={() => {
                              setActiveGame(3);
                              resetGame3();
                            }}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
                          >
                            <span>Անցնել 3-րդ խաղին</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ACTIVE GAME 3: AFIRMATIVO VS NEGATIVO SORTER */}
                  {activeGame === 3 && (
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Instruction bubble */}
                        <div className="bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-xs px-4 py-3 rounded-xl mb-6 font-sans">
                          ⚖️ <strong>Դրական թե Բացասական.</strong> Կարդացեք իսպաներեն նախադասությունը և որոշեք՝ արդյոք այն դրական հրաման է (Afirmativo), թե արգելող/բացասական (Negativo)։
                        </div>

                        {/* Single Card to Sort counter */}
                        <div className="text-center text-xs text-slate-500 font-bold mb-4">
                          ՔԱՐՏ {sortIndex + 1} / {sortCards.length}
                        </div>

                        {/* Main active interactive card container */}
                        <div className="relative max-w-md mx-auto aspect-video bg-slate-950 rounded-2xl border border-slate-850 shadow-xl p-6 flex flex-col justify-between text-center overflow-hidden">
                          {/* Top accent badge */}
                          <div className="mx-auto text-[10px] bg-slate-900 border border-slate-800 text-slate-400 uppercase px-2.5 py-0.5 rounded-full font-bold">
                            Կարգավիճակը ՝ Ընթացիկ
                          </div>

                          {/* Spanish phrase */}
                          <div className="my-3 space-y-2">
                            <h3 className="text-2xl font-bold font-display text-white">
                              {currentSortCard.phrase}
                            </h3>
                            <p className="text-sm font-sans text-slate-400 font-medium">
                              {currentSortCard.translation}
                            </p>
                          </div>

                          {/* Answer visual display if evaluated */}
                          <div>
                            {sortState ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-xs px-3 py-2 rounded-lg font-medium inline-block border ${
                                  sortState.isCorrect 
                                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                                    : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                                }`}
                              >
                                {sortState.isCorrect ? '✅ Ճիշտ ընտրություն' : '❌ Սխալ ընտրություն'}
                              </motion.div>
                            ) : (
                              <div className="h-6" />
                            )}
                          </div>
                        </div>

                        {/* Interactive decision buttons */}
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-6">
                          <button
                            id="sort-btn-afirmativo"
                            disabled={sortState !== null}
                            onClick={() => handleSortSelection('afirmativo')}
                            className={`p-4 rounded-xl border text-center text-sm font-bold transition-all cursor-pointer ${
                              sortState?.selected === 'afirmativo'
                                ? sortState.isCorrect 
                                  ? 'bg-emerald-600 border-emerald-500 text-white scale-95 shadow-none'
                                  : 'bg-rose-600 border-rose-500 text-white scale-95 shadow-none animate-shake'
                                : 'bg-emerald-950/20 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 border-emerald-900/60 text-emerald-400'
                            }`}
                          >
                            ԴՐԱԿԱՆ<br/>
                            <span className="text-[10px] font-normal font-sans">Afirmativo</span>
                          </button>

                          <button
                            id="sort-btn-negativo"
                            disabled={sortState !== null}
                            onClick={() => handleSortSelection('negativo')}
                            className={`p-4 rounded-xl border text-center text-sm font-bold transition-all cursor-pointer ${
                              sortState?.selected === 'negativo'
                                ? sortState.isCorrect 
                                  ? 'bg-emerald-600 border-emerald-500 text-white scale-95 shadow-none'
                                  : 'bg-rose-600 border-rose-500 text-white scale-95 shadow-none animate-shake'
                                : 'bg-rose-950/20 hover:bg-rose-600 hover:text-white hover:border-rose-500 border-rose-900/60 text-rose-400'
                            }`}
                          >
                            ԲԱՑԱՍԱԿԱՆ<br/>
                            <span className="text-[10px] font-normal font-sans">Negativo</span>
                          </button>
                        </div>

                        {/* Evaluation explanation card */}
                        {sortState && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-925/40 border border-slate-850 p-4 rounded-xl text-xs max-w-md mx-auto"
                          >
                            <h5 className="font-bold text-slate-200 mb-1">📝 Քերականական Նշում՝</h5>
                            <p className="text-slate-400 leading-relaxed">
                              {currentSortCard.explanation}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Action trigger button */}
                      <div className="mt-8 flex justify-end">
                        {sortState && (
                          <button
                            id="next-sort-btn"
                            onClick={handleNextSort}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                          >
                            <span>
                              {sortIndex + 1 < sortCards.length
                                ? 'Հաջորդ քարտը'
                                : 'Ավարտել և ստանալ աստղեր'}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Game Completion success message banner */}
                      {completedGames.includes('game3') && sortIndex + 1 === sortCards.length && sortState && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4 max-w-md mx-auto mt-6">
                          <StarsBadge size="lg" />
                          <h3 className="font-bold text-emerald-300 text-lg font-display">Գերազանց է։</h3>
                          <p className="text-xs text-slate-350">
                            Դուք հեշտությամբ տարբերակում եք դրական և բացասական նախադասությունները իսպաներենում։
                          </p>
                          <button
                            id="to-game4-btn"
                            onClick={() => {
                              setActiveGame(4);
                              resetGame4();
                            }}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
                          >
                            <span>Բացել 4-րդ խաղը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ACTIVE GAME 4: CONVERSATIONAL DIALOGUE HELPER */}
                  {activeGame === 4 && (
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dialogue introduction instruction bubble */}
                        <div className="bg-orange-950/20 border border-orange-500/20 text-orange-355 text-xs px-4 py-3 rounded-xl mb-6 font-sans">
                          💬 <strong>Դասարանական երկխոսություն.</strong> Լրացրեք ուսուցչուհու ձևակերպած հարցերն ու հրամանները՝ իսպաներեն տեքստային դիալոգը ճիշտ ամբողջացնելու համար:
                        </div>

                        {/* Live Dialog Screen Interface */}
                        <div className="border border-slate-850 rounded-2xl bg-slate-950/40 overflow-hidden max-w-lg mx-auto">
                          
                          {/* Dialog header panel */}
                          <div className="bg-slate-900 px-4 py-3 border-b border-slate-850 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 font-sans">Դասարանում • Classroom Chat</span>
                            <span className="text-[10px] font-mono bg-orange-500/15 text-orange-350 border border-orange-500/20 px-2 py-0.5 rounded">
                              Քայլ {dialogueIndex + 1} / {DIALOGUE_STEPS.length}
                            </span>
                          </div>

                          {/* Chat Messages flow thread body */}
                          <div className="p-4 space-y-4 min-h-[160px] flex flex-col justify-end">
                            {/* Visual tutor avatar dialog bubble */}
                            <div className="flex items-start gap-3">
                              <div className="h-9 w-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-lg flex-shrink-0 text-orange-400">
                                {currentDiagStep.avatar}
                              </div>
                              <div className="space-y-1 bg-slate-950/80 border border-slate-850 p-3.5 rounded-2xl shadow-xl max-w-[85%] text-left">
                                <span className="block text-[10px] font-bold text-indigo-400 tracking-wide uppercase">
                                  {currentDiagStep.character} (Տնային հրահանգ)
                                </span>
                                <p className="text-xs text-slate-400 italic mb-2">
                                  {currentDiagStep.contextArm}
                                </p>
                                <p className="text-sm font-semibold text-slate-200 leading-relaxed font-sans">
                                  {currentDiagStep.dialogueBefore}
                                  <span className="bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded mx-1 select-none text-xs font-mono">
                                    {dialogueAnswered ? currentDiagStep.correctValue : currentDiagStep.missingPart}
                                  </span>
                                  {currentDiagStep.dialogueAfter}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Multi choice interactive options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto my-6">
                          {currentDiagStep.options.map((opt) => {
                            const isSelected = dialogueSelected === opt;
                            const isCorrectVal = opt === currentDiagStep.correctValue;
                            let btnCls = 'border-slate-850 bg-slate-950/40 text-slate-300 hover:border-orange-500/50 hover:bg-orange-950/10 hover:text-white';

                            if (dialogueAnswered) {
                              if (isCorrectVal) {
                                btnCls = 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/10';
                              } else if (isSelected) {
                                btnCls = 'bg-rose-600 border-rose-500 text-white font-semibold shadow-md shadow-rose-500/10 animate-shake';
                              } else {
                                btnCls = 'bg-slate-950/20 border-slate-900 opacity-30 text-slate-500';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                id={`dialogue-choice-btn-${opt}`}
                                disabled={dialogueAnswered}
                                onClick={() => handleDialogueSelect(opt)}
                                className={`p-3.5 text-left rounded-xl border text-xs font-bold font-mono transition-all flex items-center justify-between cursor-pointer ${btnCls}`}
                              >
                                <span>{opt}</span>
                                {dialogueAnswered && isCorrectVal && <Check className="h-4 w-4" />}
                                {dialogueAnswered && isSelected && !isCorrectVal && <XCircle className="h-4 w-4" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive analytical box */}
                        {dialogueAnswered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-indigo-950/20 border border-indigo-500/30 p-4 rounded-xl text-xs max-w-lg mx-auto"
                          >
                            <h5 className="font-bold text-slate-200 mb-1 text-sm">💡 Ինչո՞ւ է այս տարբերակը ճիշտ.</h5>
                            <p className="text-slate-400 leading-relaxed font-sans font-normal">
                              {currentDiagStep.explanationArm}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Action buttons footer */}
                      <div className="mt-8 flex justify-end">
                        {dialogueAnswered && (
                          <button
                            id="next-dialogue-btn"
                            onClick={handleNextDialogue}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                          >
                            <span>
                              {dialogueIndex + 1 < DIALOGUE_STEPS.length
                                ? 'Հաջորդ երկխոսությունը'
                                : 'Ավարտել և ստանալ աստղեր'}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Final step completed dialogue states */}
                      {completedGames.includes('game4') && dialogueIndex + 1 === DIALOGUE_STEPS.length && dialogueAnswered && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4 max-w-lg mx-auto mt-6">
                          <StarsBadge size="lg" />
                          <h3 className="font-bold text-emerald-300 text-base">Կատարյալ է:</h3>
                          <p className="text-xs text-slate-300">
                            Դուք օգնեցիք Լուսիային և Կառլոսին ճիշտ արձագանքել ուսուցչուհու հարցերին և ավարտեցիք իսպաներեն դասարանական դիալոգը:
                          </p>
                          <button
                            id="to-game5-btn"
                            onClick={() => {
                              setActiveGame(5);
                              resetGame5();
                            }}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
                          >
                            <span>Անցնել 5-րդ վերջին խաղին</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ACTIVE GAME 5: SENTENCE PUZZLE CONSTRUCTOR */}
                  {activeGame === 5 && (
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Word ordering instruction puzzle bubble */}
                        <div className="bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-xs px-4 py-3 rounded-xl mb-6 font-sans">
                          🧱 <strong>Կառուցիր նախադասությունը.</strong> Խաղում ներառված են դերանուններով և վերադարձական բայերով հրամայականներ։ Հերթով սեղմեք բլոկների վրա՝ նախադասությունը ճիշտ հերթականությամբ հավաքելու համար:
                        </div>

                        {/* Top prompt detailing grammatical target */}
                        <div className="text-center text-xs text-slate-500 font-bold mb-2">
                          ԽՆԴԻՐ {puzzleIndex + 1} / {PUZZLE_ITEMS.length}
                        </div>

                        {/* Armenian prompt sentence details */}
                        <div className="bg-indigo-950/80 border border-indigo-500/25 text-white p-5 rounded-2xl shadow-sm text-center mb-6 max-w-lg mx-auto">
                          <div className="text-[10px] text-indigo-305 font-bold uppercase tracking-wider mb-1">Թիրախային թարգմանությունը՝</div>
                          <p className="text-lg font-bold">
                            {currentPuzzle.armenianPrompt}
                          </p>
                        </div>

                        {/* Sentence builder slots visualization container */}
                        <div className="border bg-slate-950/60 border-dashed border-slate-800 py-6 px-4 rounded-xl min-h-[82px] flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                          {puzzleSelectedTokens.length === 0 ? (
                            <span className="text-xs text-slate-500 select-none">
                              Սեղմեք ստորև տրված բառերի վրա՝ այստեղ տեղադրելու համար
                            </span>
                          ) : (
                            puzzleSelectedTokens.map((tok, idx) => (
                              <button
                                key={`${tok}-${idx}`}
                                id={`placed-word-${idx}`}
                                disabled={puzzleFeedback?.checked}
                                onClick={() => handleRemoveToken(idx)}
                                className="px-3.5 py-1.5 bg-indigo-550/20 text-indigo-200 border border-indigo-500/30 rounded-lg text-xs sm:text-sm font-semibold font-mono transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-200"
                                title="Սեղմեք հեռացնելու համար"
                              >
                                <span>{tok}</span>
                                <span className="text-[9px] opacity-45">×</span>
                              </button>
                            ))
                          )}
                        </div>

                        {/* Available tokens pool below */}
                        <div className="my-6">
                          <span className="block text-center text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-3">Հասանելի բառերի բլոկներ</span>
                          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                            {currentPuzzle.allTokens.map((tok, idx) => {
                              const placedCount = puzzleSelectedTokens.filter(x => x === tok).length;
                              const maxAvailable = currentPuzzle.allTokens.filter(x => x === tok).length;
                              const isDepleted = placedCount >= maxAvailable;

                              return (
                                <button
                                  key={`${tok}-${idx}`}
                                  id={`token-pool-btn-${tok}-${idx}`}
                                  disabled={isDepleted || puzzleFeedback?.checked}
                                  onClick={() => handleTokenClick(tok)}
                                  className={`px-4 py-2 border rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                                    isDepleted
                                      ? 'bg-slate-950/20 border-slate-900 text-slate-700 opacity-20 cursor-not-allowed'
                                      : 'bg-slate-950/50 border border-slate-850 text-slate-300 hover:border-orange-500/50 hover:bg-orange-950/10 hover:text-white cursor-pointer shadow-md shadow-slate-950/25'
                                  }`}
                                >
                                  {tok}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Interactive puzzle evaluation panel */}
                        {puzzleFeedback && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl border mt-4 text-xs max-w-lg mx-auto ${
                              puzzleFeedback.isCorrect
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                                : 'bg-rose-950/20 border-rose-500/30 text-slate-300 animate-shake'
                            }`}
                          >
                            <h5 className="font-bold mb-1 flex items-center gap-1.5 text-sm">
                              {puzzleFeedback.isCorrect ? (
                                <span className="text-emerald-400">🟢 Ճիշտ է հավաքված։</span>
                              ) : (
                                <span className="text-rose-450 font-bold">🔴 Սխալ հերթականություն։</span>
                              )}
                              <span className="text-slate-200">Կանոնը`</span>
                            </h5>
                            <p className="leading-relaxed font-sans text-slate-300">
                              {currentPuzzle.explanationArm}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Core control actions buttons */}
                      <div className="mt-8 flex items-center justify-between max-w-lg mx-auto w-full">
                        <button
                          onClick={() => setPuzzleSelectedTokens([])}
                          disabled={puzzleSelectedTokens.length === 0 || puzzleFeedback?.checked}
                          className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-850 bg-slate-950/30 rounded-lg hover:bg-slate-900 transition-colors disabled:opacity-45 cursor-pointer"
                        >
                          Մաքրել
                        </button>

                        <div className="flex gap-2">
                          {!puzzleFeedback?.checked ? (
                            <button
                              id="check-puzzle-answer-btn"
                              onClick={handleCheckPuzzleAnswer}
                              disabled={puzzleSelectedTokens.length === 0}
                              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-orange-950/40 flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Ստուգել պատասխանը</span>
                              <Check className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              id="next-puzzle-step-btn"
                              onClick={handleNextPuzzle}
                              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
                            >
                              <span>
                                {puzzleIndex + 1 < PUZZLE_ITEMS.length
                                  ? 'Հաջորդ նախադասությունը'
                                  : 'Ավարտել և ամփոփել'}
                              </span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Final progression block completing everything */}
                      {completedGames.includes('game5') && puzzleIndex + 1 === PUZZLE_ITEMS.length && puzzleFeedback?.checked && (
                        <div className="bg-indigo-950/55 border border-indigo-500/30 rounded-2xl p-6 text-center space-y-4 max-w-lg mx-auto text-white mt-6 shadow-xl animate-pulse-slow">
                          <StarsBadge size="lg" />
                          <h3 className="font-bold text-lg font-display text-amber-400">🎉 Ամբողջը Հաջողությամբ Ավարտված է:</h3>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Շնորհավորում ենք, դուք հաջողությամբ ավարտեցիք բոլոր 5 պրակտիկ խաղերը և գուշակեցիք բոլոր դժվար հանձնարարությունները: Իսպաներենի "Imperativo"-ի հրամայական եղանակի կանոններն արդեն լիովին պարզ են:
                          </p>
                          <button
                            id="back-to-theory-finish-btn"
                            onClick={() => {
                              setActiveTab('theory');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 hover:scale-[1.02] active:scale-95 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-950/50 block mx-auto text-center font-sans mt-4"
                          >
                            Անցնել Տեսությանը
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modern, clean footer */}
      <footer className="border-t border-slate-900/65 bg-transparent py-8 mt-12 text-center text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-2 font-sans">
          <p className="text-slate-450 font-medium font-sans">
            🇪🇸 Իսպաներենի Հրամայական Եղանակ (Imperativo) - Ուսուցման Հարթակ
          </p>
          <p className="text-[11px] text-slate-500 font-sans">
            Նախագծված է որպես ինտուիտիվ ինտերակտիվ օգնական իսպաներեն սովորողների համար։
          </p>
        </div>
      </footer>
    </div>
  );
}

// Sparkle Star badge helper
function StarsBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = size === 'lg' ? 'h-14 w-14' : size === 'md' ? 'h-10 w-10' : 'h-7 w-7';
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/10 ring-4 ring-yellow-500/5 animate-bounce">
      <Star className="h-7 w-7 fill-yellow-400 text-yellow-500" />
    </div>
  );
}
