import { ReactElement, ReactHTMLElement, useEffect, useMemo, useState } from "react";

type StateType = "pending" | "resolved" | "rejected";
interface ResourceType<T> {
  state: StateType;
  error?: string;
  value: T | null;
}

export function useResource<T>(callback: () => Promise<T>): ResourceType<T> {

  const [value, setValue] = useState<T | null>(null);
  const [state, setState]: [StateType, any] = useState('pending');
  let error: string | undefined = undefined;
  useEffect(() => {
    callback()
      .then(res => {
        setValue(res);
        setState('resolved')
      })
      .catch(err => {
        error = err;
        setState('rejected');
      })
  }, []);

  return {
    state,
    error,
    value
  };
}

interface ResourceProps<T> {
  value: ResourceType<T>;
  onResolved: (data: T) => any;
  onRejected?: (err?: string) => ReactElement;
  onPending?: () => ReactElement;
}

export const Resource = <T>(props: ResourceProps<T>) => {
  if(props.value.state === 'resolved') return props.onResolved(props.value.value!);
  if(props.value.state === 'pending') return props.onPending && props.onPending();
  if(props.value.state === 'rejected') return props.onRejected && props.onRejected(props.value.error!);
}