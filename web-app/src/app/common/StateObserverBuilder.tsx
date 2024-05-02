'use client';

import { useEffect, useState } from 'react';

import StateObserver from '@/core/common/StateObserver.ts';

export function useObserverState<S>(observer: StateObserver<S>) {
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
