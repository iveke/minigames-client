# Mini-Games

Description...

## Setup

1. Create empty root directory for the project:
2. Go to the directory in the terminal:
    ```bash
    cd .../<project-name>
    ```
3. Clone the [client](https://github.com/iveke/minigames-client.git) repository
    ```bash
    git clone https://github.com/iveke/minigames-client.git ./minigames-client
    ```
4. Install Node.js from https://nodejs.org (if not installed).
5. Install the dependencies:
    ```bash
    cd minigames-client 
    ```
   ```bash
   npm install
    ```

6. Go to the root

    ```bash
    cd ..
    ```

7. Clone the [server](https://github.com/iveke/minigames-back.git)
    ```bash
    git clone https://github.com/iveke/minigames-back.git ./minigames-back

    ```

8. Instal .NET SDK 8.0 from https://dotnet.microsoft.com/download/dotnet/8.0 (if not installed).



## Development Server

### Frontend
Start the development server on http://localhost:3000:

```bash
npm run dev -- -o
```

Host the server on your local network:

```bash
npm run dev -- -o --host
```

* http://192.168.1.68:3000/ on mobile if QR code does not work.
* `Ctrl + C` to stop the server.

### Backend

Start the development server on http://localhost::
```bash
cd minigames-back
```
```bash
dotnet run
```
[//]: # (## Production)

[//]: # ()

[//]: # (Build the application for production:)

[//]: # ()

[//]: # (```bash)

[//]: # (npm run build)

[//]: # (```)

[//]: # ()

[//]: # (Locally preview production build:)

[//]: # ()

[//]: # (```bash)

[//]: # (npm run preview)

[//]: # (```)

[//]: # ()

[//]: # (Check out the [deployment documentation]&#40;https://nuxt.com/docs/getting-started/deployment&#41; for more information.)
