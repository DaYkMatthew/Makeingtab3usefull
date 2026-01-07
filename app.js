const { useState, useEffect } = React;

// Icon components
const Tv = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
    <polyline points="17 2 12 7 7 2"/>
  </svg>
);

const Home = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
  </svg>
);

const User = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Lock = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ArrowLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const Play = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const Pause = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const X = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Zap = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const Moon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Monitor = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const Power = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
    <line x1="12" y1="2" x2="12" y2="12"/>
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const SmartHub = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [time, setTime] = useState(new Date());
  const [timers, setTimers] = useState([]);
  const [events, setEvents] = useState([
    { id: 1, name: 'Weekend', date: getNextWeekend() }
  ]);
  const [showAddTimer, setShowAddTimer] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [quotes] = useState([
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" }
  ]);
  
  const correctPin = '0000';

  function getNextWeekend() {
    const now = new Date();
    const day = now.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7 || 7;
    const saturday = new Date(now);
    saturday.setDate(now.getDate() + daysUntilSaturday);
    saturday.setHours(0, 0, 0, 0);
    return saturday.toISOString().split('T')[0];
  }

  const getDailyQuote = () => {
    const dayOfYear = Math.floor((time - new Date(time.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return quotes[dayOfYear % quotes.length];
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimers(prev => prev.map(t => {
        if (t.remaining > 0) {
          return { ...t, remaining: t.remaining - 1 };
        }
        return t;
      }));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const preventDefault = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setTimeout(() => {
            setIsLocked(false);
            setPin('');
          }, 200);
        } else {
          setShake(true);
          setTimeout(() => {
            setPin('');
            setShake(false);
          }, 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleLock = () => {
    setIsLocked(true);
    setCurrentPage('home');
    setPin('');
  };

  const addTimer = (minutes) => {
    const newTimer = {
      id: Date.now(),
      name: `${minutes}m Timer`,
      duration: minutes * 60,
      remaining: minutes * 60,
      isRunning: true
    };
    setTimers([...timers, newTimer]);
    setShowAddTimer(false);
    setCustomMinutes('');
  };

  const toggleTimer = (id) => {
    setTimers(timers.map(t => 
      t.id === id ? { ...t, isRunning: !t.isRunning } : t
    ));
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(t => t.id !== id));
  };

  const addEvent = () => {
    if (newEventName && newEventDate) {
      const newEvent = {
        id: Date.now(),
        name: newEventName,
        date: newEventDate
      };
      setEvents([...events, newEvent]);
      setNewEventName('');
      setNewEventDate('');
      setShowAddEvent(false);
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const getTimeUntil = (dateString) => {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target - now;
    
    if (diff < 0) return { text: 'Past', progress: 100 };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    const totalDays = 7;
    const progress = Math.max(0, Math.min(100, ((totalDays * 24 - (days * 24 + hours)) / (totalDays * 24)) * 100));
    
    if (days > 0) return { text: `${days}d ${hours}h`, progress };
    if (hours > 0) return { text: `${hours}h`, progress };
    return { text: 'Today!', progress };
  };

  if (isLocked) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center select-none overflow-hidden">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-white mb-2">Smart Hub</h1>
          <p className="text-gray-400 text-xl">Enter PIN to unlock</p>
        </div>

        <div className={`flex gap-5 mb-16 ${shake ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                i < pin.length
                  ? 'bg-blue-500 border-blue-500'
                  : shake
                  ? 'border-red-500'
                  : 'border-gray-500'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-3xl font-light transition-all duration-100 border-2 border-gray-700 active:scale-95"
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleNumberClick('0')}
            className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-3xl font-light transition-all duration-100 border-2 border-gray-700 active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-2xl transition-all duration-100 border-2 border-gray-700 active:scale-95"
          >
            ⌫
          </button>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  if (currentPage === 'home') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-hidden">
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-light text-white">Smart Hub</h1>
            <button
              onClick={handleLock}
              className="p-3 rounded-full bg-gray-800 active:bg-gray-700 transition-all border-2 border-gray-700 active:scale-95"
            >
              <Lock className="w-6 h-6 text-gray-300" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentPage('tv')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-blue-500 transition-all duration-100 flex flex-col items-center justify-center gap-3 active:scale-95"
            >
              <Tv className="w-16 h-16 text-blue-400" />
              <span className="text-2xl font-light text-white">TV</span>
            </button>

            <button
              onClick={() => setCurrentPage('daily')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-green-500 transition-all duration-100 flex flex-col items-center justify-center gap-3 active:scale-95"
            >
              <Home className="w-16 h-16 text-green-400" />
              <span className="text-2xl font-light text-white">Home</span>
            </button>

            <button
              onClick={() => setCurrentPage('settings')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-purple-500 transition-all duration-100 flex flex-col items-center justify-center gap-3 active:scale-95"
            >
              <Settings className="w-16 h-16 text-purple-400" />
              <span className="text-2xl font-light text-white">Settings</span>
            </button>

            <button
              onClick={() => setCurrentPage('user')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-orange-500 transition-all duration-100 flex flex-col items-center justify-center gap-3 active:scale-95"
            >
              <User className="w-16 h-16 text-orange-400" />
              <span className="text-2xl font-light text-white">User</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const PageHeader = ({ title, color }) => (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={() => setCurrentPage('home')}
        className="p-3 rounded-full bg-gray-800 active:bg-gray-700 transition-all border-2 border-gray-700 active:scale-95"
      >
        <ArrowLeft className="w-6 h-6 text-gray-300" />
      </button>
      <h1 className={`text-3xl font-light text-${color}-400 flex-1`}>{title}</h1>
      <button
        onClick={handleLock}
        className="p-3 rounded-full bg-gray-800 active:bg-gray-700 transition-all border-2 border-gray-700 active:scale-95"
      >
        <Lock className="w-6 h-6 text-gray-300" />
      </button>
    </div>
  );

  if (currentPage === 'tv') {
    const [spotifyUrl, setSpotifyUrl] = useState('https://open.spotify.com');
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-4 pb-20">
          <PageHeader title="Media & TV" color="blue" />
          
          <div className="mb-4 p-4 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="text-xl font-light text-white">Spotify</h2>
            </div>
            <p className="text-sm text-gray-400 mb-3">Shows what's playing on any of your devices</p>
            <div className="bg-black rounded-xl overflow-hidden" style={{height: '320px'}}>
              <iframe 
                src={spotifyUrl}
                width="100%" 
                height="320" 
                frameBorder="0" 
                allowtransparency="true" 
                allow="encrypted-media"
                style={{borderRadius: '12px'}}
              ></iframe>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button 
                onClick={() => setSpotifyUrl('https://open.spotify.com')}
                className="p-3 rounded-xl bg-green-600 active:bg-green-700 border-2 border-green-500 text-white text-center text-base active:scale-95 transition-all"
              >
                Spotify Home
              </button>
              <a 
                href="spotify://" 
                className="p-3 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-center text-base active:scale-95 transition-all flex items-center justify-center"
              >
                Open App
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-xl font-light text-white mb-3">Apple TV</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-base active:scale-95">
                <Zap className="w-5 h-5 mx-auto mb-1" />
                Wake
              </button>
              <button className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-base active:scale-95">
                <Moon className="w-5 h-5 mx-auto mb-1" />
                Sleep
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'daily') {
    const formatTimeDisplay = (date) => {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };
    const formatDateDisplay = (date) => {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const dailyQuote = getDailyQuote();

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-4 pb-20">
          <PageHeader title="Daily Dashboard" color="green" />
          
          <div className="mb-4 p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 text-center">
            <div className="text-6xl font-light text-white mb-1">{formatTimeDisplay(time)}</div>
            <div className="text-xl text-gray-400">{formatDateDisplay(time)}</div>
          </div>

          <div className="mb-4 p-4 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-light text-white">Timers</h2>
              <button
                onClick={() => setShowAddTimer(true)}
                className="p-2 rounded-lg bg-green-600 active:bg-green-700 border-2 border-green-500 active:scale-95"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {showAddTimer && (
              <div className="mb-3 p-3 rounded-xl bg-gray-700 border-2 border-gray-600">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <button onClick={() => addTimer(5)} className="p-2 rounded-lg bg-gray-600 active:bg-gray-500 text-white text-sm active:scale-95">5m</button>
                  <button onClick={() => addTimer(10)} className="p-2 rounded-lg bg-gray-600 active:bg-gray-500 text-white text-sm active:scale-95">10m</button>
                  <button onClick={() => addTimer(30)} className="p-2 rounded-lg bg-gray-600 active:bg-gray-500 text-white text-sm active:scale-95">30m</button>
                  <button onClick={() => addTimer(60)} className="p-2 rounded-lg bg-gray-600 active:bg-gray-500 text-white text-sm active:scale-95">60m</button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    placeholder="Minutes"
                    className="flex-1 p-2 rounded-lg bg-gray-600 text-white border-2 border-gray-500 text-sm"
                  />
                  <button
                    onClick={() => customMinutes && addTimer(parseInt(customMinutes))}
                    className="px-4 rounded-lg bg-green-600 active:bg-green-700 text-white text-sm active:scale-95"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {setShowAddTimer(false); setCustomMinutes('');}}
                    className="px-4 rounded-lg bg-red-600 active:bg-red-700 text-white text-sm active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {timers.length === 0 && !showAddTimer && (
                <p className="text-gray-400 text-center py-3 text-sm">No active timers</p>
              )}
              {timers.map(timer => (
                <div key={timer.id} className="p-3 rounded-xl bg-gray-700 border-2 border-gray-600 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white text-base">{timer.name}</div>
                    <div className={`text-lg font-light ${timer.remaining === 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {timer.remaining === 0 ? 'Time\'s Up!' : formatTime(timer.remaining)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {timer.remaining > 0 && (
                      <button
                        onClick={() => toggleTimer(timer.id)}
                        className="p-2 rounded-lg bg-gray-600 active:bg-gray-500 active:scale-95"
                      >
                        {timer.isRunning ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                      </button>
                    )}
                    <button
                      onClick={() => deleteTimer(timer.id)}
                      className="p-2 rounded-lg bg-red-600 active:bg-red-700 active:scale-95"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-700/50">
            <h2 className="text-xl font-light text-white mb-2">Quote of the Day</h2>
            <p className="text-lg text-gray-200 italic mb-2">"{dailyQuote.text}"</p>
            <p className="text-base text-gray-400">— {dailyQuote.author}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-light text-white">Event Countdowns</h2>
              <button
                onClick={() => setShowAddEvent(true)}
                className="p-2 rounded-lg bg-green-600 active:bg-green-700 border-2 border-green-500 active:scale-95"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>

            {showAddEvent && (
              <div className="mb-3 p-3 rounded-xl bg-gray-700 border-2 border-gray-600">
                <input
                  type="text"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  placeholder="Event name"
                  className="w-full p-2 rounded-lg bg-gray-600 text-white border-2 border-gray-500 mb-2 text-sm"
                />
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-600 text-white border-2 border-gray-500 mb-2 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addEvent}
                    className="flex-1 p-2 rounded-lg bg-green-600 active:bg-green-700 text-white text-sm active:scale-95"
                  >
                    Add Event
                  </button>
                  <button
                    onClick={() => {setShowAddEvent(false); setNewEventName(''); setNewEventDate('');}}
                    className="flex-1 p-2 rounded-lg bg-red-600 active:bg-red-700 text-white text-sm active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {events.map(event => {
                const timeInfo = getTimeUntil(event.date);
                return (
                  <div key={event.id} className="p-3 rounded-xl bg-gray-700 border-2 border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-base">{event.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-light text-green-400">{timeInfo.text}</span>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-1 rounded-lg bg-red-600 active:bg-red-700 active:scale-95"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full transition-all" style={{width: `${timeInfo.progress}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'settings') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-4">
          <PageHeader title="Settings" color="purple" />
          
          <div className="space-y-3">
            <button className="w-full p-5 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-xl text-white mb-1">Change PIN</div>
              <div className="text-base text-gray-400">Update your unlock PIN</div>
            </button>
            
            <button className="w-full p-5 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-xl text-white mb-1">Brightness</div>
              <div className="text-base text-gray-400">Day / Night presets</div>
            </button>
            
            <button className="w-full p-5 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-xl text-white mb-1">Display</div>
              <div className="text-base text-gray-400">Keep screen on while charging</div>
            </button>
            
            <button className="w-full p-5 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-xl text-white mb-1">About</div>
              <div className="text-base text-gray-400">Device info & version</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'user') {
    const sendPCCommand = (command) => {
      alert(`PC Command: ${command}\n\nTo make this work, you need to set up a simple server on your Windows PC that listens for these commands.`);
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-4 pb-20">
          <PageHeader title="User & Utilities" color="orange" />
          
          <div className="mb-4 p-6 rounded-2xl bg-gradient-to-br from-orange-900/40 to-red-900/40 border-2 border-orange-600">
            <h2 className="text-2xl font-light text-white mb-2 text-center">Find My Phone</h2>
            <p className="text-base text-gray-300 mb-4 text-center">Ring your Razr Ultra</p>
            <button className="w-full p-5 rounded-xl bg-orange-600 active:bg-orange-700 border-2 border-orange-500 text-white text-xl font-light active:scale-95 transition-all">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              Ring Phone Now
            </button>
            <p className="text-sm text-gray-400 mt-3 text-center">Uses MacroDroid on your phone</p>
          </div>

          <div className="mb-4 p-5 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-xl font-light text-white mb-3">PC Controls</h2>
            <p className="text-sm text-gray-400 mb-3">Control your Windows PC</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => sendPCCommand('sleep')}
                className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white active:scale-95 transition-all"
              >
                <Moon className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Sleep</div>
              </button>
              <button 
                onClick={() => sendPCCommand('lock')}
                className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white active:scale-95 transition-all"
              >
                <Lock className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Lock</div>
              </button>
              <button 
                onClick={() => sendPCCommand('shutdown')}
                className="p-4 rounded-xl bg-red-700 active:bg-red-600 border-2 border-red-600 text-white active:scale-95 transition-all"
              >
                <Power className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Shutdown</div>
              </button>
              <button 
                onClick={() => sendPCCommand('restart')}
                className="p-4 rounded-xl bg-yellow-700 active:bg-yellow-600 border-2 border-yellow-600 text-white active:scale-95 transition-all"
              >
                <Monitor className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Restart</div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={handleLock} className="w-full p-5 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-xl text-white mb-1">Lock Screen</div>
              <div className="text-base text-gray-400">Return to PIN screen</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SmartHub />);
