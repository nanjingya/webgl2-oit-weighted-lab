export function bindControls({ statusEl, statsEl }) {
  if (statusEl) statusEl.textContent = 'ready';
  return {
    setStats(s) { if (statsEl) statsEl.textContent = JSON.stringify(s); },
  };
}
