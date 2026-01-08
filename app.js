const { useState, useEffect } = React;

// Simplified icon components
const Icon = ({ d, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d={d} />
  </svg>
);

const Tv = (p) => <Icon {...p} d="M2 7h20v13H2V7zm5-5l5 5-5 5" />;
const Home = (p) => <Icon {...p} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm6 13V12h6v10" />;
const Settings = (p) => <Icon {...p} d="M12 15a3 3 0 100-6 3 3 0 000 6zm0-14v6m0 6v6" />;
const User = (p) => <Icon {...p} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />;
const Lock = (p) => <Icon {...p} d="M3 11h18v11H3V11zM7 11V7a5 5 0 0110 0v4" />;
const ArrowLeft = (p) => <Icon {...p} d="M19 12H5m7 7l-7-7 7-7" />;
const Play = (p) => <Icon {...p} d="M5 3l14 9-14 9V3z" />;
const Pause = (p) => <Icon {...p} d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />;
const X = (p) => <Icon {...p} d="M18 6L6 18M6 6l12 12" />;
const Plus = (p) => <Icon {...p} d="M12 5v14m-7-7h14" />;
const SkipForward = (p) => <Icon {...p} d="M5 4l10 8-10 8V4zM19 5v14" />;
const Volume2 = (p) => <Icon {...p} d="M11 5L6 9H2v6h4l5 4V5zm8 7a10 10 0 000-14M16 12a5 5 0 000-7" />;
const Power = (p) => <Icon {...p} d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />;
const Bell = (p) => <Icon {...p} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />;
const Cloud = (p) => <Icon {...p} d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />;

const USERS = {
  '0920': { name: 'Matthew', color: 'blue', hasTV: true, hasPC: true },
  '0304': { name: 'Guest 1', color: 'green', hasTV: false, hasPC: false },
  '6288': { name: 'Guest 2', color: 'purple', hasTV: false, hasPC: false }
};

const SmartHub = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [time, setTime] = useState(new Date());
  const [showGreeting, setShowGreeting] = useState(false);
  const [weather, setWeather] = useState(null);
  const [dailyQuote, setDailyQuote] = useState({ text: "Loading...", author: "" });
  const [timers, setTimers] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [events, setEvents] = useState([]);
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(37.3382, -121.8863)
      );
    }
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.quotable.io/random');
        const data = await res.json();
        setDailyQuote({ text: data.content, author: data.author });
      } catch {
        setDailyQuote({ text: "Do what you love.", author: "Unknown" });
      }
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      alarms.forEach(alarm => {
        if (alarm.enabled && alarm.time === currentTime && !alarm.triggered) {
          alert(`⏰ ${alarm.name || 'Alarm!'}`);
          setAlarms(prev => prev.map(a => a.id === alarm.id ? { ...a, triggered: true } : a));
        }
      });
    };
    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(t => {
        if (t.isRunning && t.remaining > 0) {
          if (t.remaining === 1) alert(`⏱️ ${t.name} finished!`);
          return { ...t, remaining: t.remaining - 1 };
        }
        return t;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`);
      const data = await res.json();
      setWeather({
        temp: Math.round(data.current_weather.temperature),
        condition: data.current_weather.weathercode === 0 ? 'Clear' : 'Cloudy'
      });
    } catch {}
  };

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (USERS[newPin]) {
          setTimeout(() => {
            setCurrentUser(newPin);
            setIsLocked(false);
            setPin('');
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
              setShowGreeting(true);
              setTimeout(() => setShowGreeting(false), 4000);
            }
          }, 200);
        } else {
          setShake(true);
          setTimeout(() => { setPin(''); setShake(false); }, 500);
        }
      }
    }
  };

  if (isLocked) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-light text-white mb-2">Smart Hub</h1>
        <p className="text-gray-400 text-xl mb-12">Enter PIN</p>
        <div className={`flex gap-5 mb-16 ${shake ? 'animate-shake' : ''}`}>
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full border-2 ${i < pin.length ? 'bg-blue-500 border-blue-500' : shake ? 'border-red-500' : 'border-gray-500'}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button key={num} onClick={() => handleNumberClick(num.toString())} className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-3xl border-2 border-gray-700">{num}</button>
          ))}
          <div/>
          <button onClick={() => handleNumberClick('0')} className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-3xl border-2 border-gray-700">0</button>
          <button onClick={() => setPin(pin.slice(0, -1))} className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-2xl border-2 border-gray-700">⌫</button>
        </div>
        <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); }}.animate-shake { animation: shake 0.3s; }`}</style>
      </div>
    );
  }

  if (showGreeting) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-light text-white mb-4">{greeting}, {USERS[currentUser].name}!</h1>
        {weather && (
          <div className="flex items-center gap-4 mb-4">
            <Cloud className="w-12 h-12 text-blue-400" />
            <div>
              <div className="text-5xl font-light text-white">{weather.temp}°F</div>
              <div className="text-2xl text-gray-400">{weather.condition}</div>
            </div>
          </div>
        )}
        <p className="text-2xl text-gray-300">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>
    );
  }

  const user = USERS[currentUser];

  if (currentPage === 'home') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-light text-white">{user.name}'s Hub</h1>
              <p className="text-gray-400 text-sm">PIN: {currentUser}</p>
            </div>
            <button onClick={() => { setIsLocked(true); setCurrentPage('home'); }} className="p-3 rounded-full bg-gray-800 border-2 border-gray-700">
              <Lock className="w-6 h-6 text-gray-300" />
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {user.hasTV && (
              <button onClick={() => setCurrentPage('tv')} className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center gap-3">
                <Tv className="w-16 h-16 text-blue-400" />
                <span className="text-2xl font-light text-white">TV</span>
              </button>
            )}
            <button onClick={() => setCurrentPage('daily')} className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center gap-3">
              <Home className="w-16 h-16 text-green-400" />
              <span className="text-2xl font-light text-white">Home</span>
            </button>
            <button onClick={() => setCurrentPage('settings')} className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center gap-3">
              <Settings className="w-16 h-16 text-purple-400" />
              <span className="text-2xl font-light text-white">Settings</span>
            </button>
            {user.hasPC && (
              <button onClick={() => setCurrentPage('pc')} className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center gap-3">
                <User className="w-16 h-16 text-orange-400" />
                <span className="text-2xl font-light text-white">PC</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'tv') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setCurrentPage('home')} className="p-3 rounded-full bg-gray-800 border-2 border-gray-700">
              <ArrowLeft className="w-6 h-6 text-gray-300" />
            </button>
            <h1 className="text-3xl font-light text-blue-400">Media & TV</h1>
          </div>
          
          <div className="mb-4 p-5 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-xl text-white mb-3">TV Power</h2>
            <button onClick={() => alert('Connect Hubspace')} className="w-full p-6 rounded-xl bg-green-600 border-2 border-green-500 text-white text-xl">
              <Power className="w-10 h-10 mx-auto mb-2" />
              Turn ON
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-xl text-white mb-3">Spotify</h2>
            <div className="bg-black rounded-xl" style={{height:'300px'}}>
              <iframe src="https://open.spotify.com" width="100%" height="300" frameBorder="0" allow="encrypted-media"></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'daily') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
        <div className="p-4 pb-20">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setCurrentPage('home')} className="p-3 rounded-full bg-gray-800 border-2 border-gray-700">
              <ArrowLeft className="w-6 h-6 text-gray-300" />
            </button>
            <h1 className="text-3xl font-light text-green-400">Daily</h1>
          </div>

          <div className="mb-4 p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 text-center">
            <div className="text-6xl font-light text-white">{time.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})}</div>
            <div className="text-xl text-gray-400">{time.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}</div>
            {weather && <div className="text-3xl text-blue-400 mt-2">{weather.temp}°F - {weather.condition}</div>}
          </div>

          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-700/50">
            <h2 className="text-xl text-white mb-2">Quote of the Day</h2>
            <p className="text-lg text-gray-200 italic">"{dailyQuote.text}"</p>
            <p className="text-base text-gray-400 mt-2">— {dailyQuote.author}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-xl text-white mb-3">Quick Tools</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => window.open('https://www.google.com/search?q=calculator', '_blank')} className="p-4 rounded-xl bg-gray-700 text-white">
                Calculator
              </button>
              <button onClick={() => window.open('https://www.google.com/calendar', '_blank')} className="p-4 rounded-xl bg-gray-700 text-white">
                Calendar
              </button>
              <button onClick={() => window.open('https://www.google.com/maps', '_blank')} className="p-4 rounded-xl bg-gray-700 text-white">
                Maps
              </button>
              <button onClick={() => window.open('https://www.youtube.com', '_blank')} className="p-4 rounded-xl bg-gray-700 text-white">
                YouTube
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'settings') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setCurrentPage('home')} className="p-3 rounded-full bg-gray-800 border-2 border-gray-700">
              <ArrowLeft className="w-6 h-6 text-gray-300" />
            </button>
            <h1 className="text-3xl font-light text-purple-400">Settings</h1>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gray-800 border-2 border-gray-700">
              <div className="text-xl text-white mb-2">Brightness</div>
              <input type="range" min="10" max="100" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full" />
              <div className="text-gray-400 text-sm mt-1">{brightness}%</div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-800 border-2 border-gray-700">
              <div className="text-xl text-white mb-1">Current User</div>
              <div className="text-gray-400">{user.name} (PIN: {currentUser})</div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-800 border-2 border-gray-700">
              <div className="text-xl text-white mb-1">Available PINs</div>
              <div className="text-gray-400 text-sm">0920 (Matthew), 0304 (Guest 1), 6288 (Guest 2)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'pc') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setCurrentPage('home')} className="p-3 rounded-full bg-gray-800 border-2 border-gray-700">
              <ArrowLeft className="w-6 h-6 text-gray-300" />
            </button>
            <h1 className="text-3xl font-light text-orange-400">PC Controls</h1>
          </div>

          <div className="p-5 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-xl text-white mb-3">Windows Controls</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => alert('Setup PC server')} className="p-4 rounded-xl bg-gray-700 text-white">Sleep</button>
              <button onClick={() => alert('Setup PC server')} className="p-4 rounded-xl bg-gray-700 text-white">Lock</button>
              <button onClick={() => alert('Setup PC server')} className="p-4 rounded-xl bg-red-700 text-white">Shutdown</button>
              <button onClick={() => alert('Setup PC server')} className="p-4 rounded-xl bg-yellow-700 text-white">Restart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SmartHub />);
