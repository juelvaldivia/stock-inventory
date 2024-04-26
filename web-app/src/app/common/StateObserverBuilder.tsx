'use client';

import StateObserver from '@/core/common/StateObserver';
import { useEffect, useState } from 'react';

export function useStateObserverState<S>(observer: StateObserver<S>) {
  const [state, setState] = useState(observer.state);

  useEffect(() => {
    const stateSubscription = (state: S) => {
      setState(state);
    };

    observer.subscribe(stateSubscription);

    return () => observer.unsubscribe(stateSubscription);
  }, [observer]);

  return state;
}
