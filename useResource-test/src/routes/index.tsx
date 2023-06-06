import { useVisibleTask$ } from '@builder.io/qwik';
import { Resource } from '@builder.io/qwik';
import { component$, useResource$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  const resource = useResource$(async () => {
    const res = await fetch('http://127.0.0.1:5173/names.json');
    return res.json();
  });
  resource.value.then(res => console.log(res));
  
  return (
    <>
      <Resource 
        value={resource}
        onResolved={(data) => <pre>{JSON.stringify(data)}</pre>}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
