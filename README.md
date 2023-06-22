This is the code for https://odin-elbasel.vercel.app website.
The original repo `OdinAi` has been made private for security reasons and so should yours if you plan to use GoogleVertexAi with your deployment.


This app used NextJs13.4 making use of sever actions and server compnents.

Most pages are generated SSR and revalidated on client-side user action with the help of a redis based database (vercel redis in this case).

Uses tailwindCss for styling along with two plugins: `tailwind-animate` and `tailwind-scrollbar`

Different parts of the app are divided into semantically-named folders, for example the `auth` folder contains all the needed backend-side api calls (server actions) AND the UI React components used on the /auth page.

Further, each folder is divided into sub-folders, for example the `auth` folder is divided into `actions`, `lib` and `ui` where:
* `actions` contains the api calls (server actions) that run server-only
* `lib` contains type definitoins and other helper classes.
* `ui` contains the react components used in the `/app/auth/page.tsx` page.

`actions` and `ui` are a common pattern while the `/auth` folder contains the `[...nextauth]`, this is a catch-all route handler that handles all https requests: GET, POST, PUT, etc...

This is the only route handler in the app as everything else is handled using server actions. This might change in the future as NextAuth might add server actions support.

the `test` folder contains sub-folder each with it's own page.tsx that can be used to render components in isolation for testing. for example, `test/button/page.tsx` can be used to test the button component at `ui/buttons/Button.tsx`. This acts as a lightweight psuedo storybook alternative.


