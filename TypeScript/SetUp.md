# SetUp for TypeScript

1. #### Initialize empty npm file
    ```
    npm init -y
    ```
---
2. #### Install typescript
    - Globally: (Accessible everywhere)

        ```
        npm i -g typescript
        ```
    - Locally: (Best practice - strictly for development)

        ```
        npm i -D typescript
        ```
---
3. #### Initialize empty tsc config
    ```
    npx tsc --init
    ```
---
4. #### Open ``` tsconfig.json ``` and uncomment out these lines
    ``` 
    "rootDir": "./src",
    "outDir": "./dist"
    ```
---
5. #### Make a src and dist folder 
    ```
    > Folder
        > src 
        > dist
    ```
---
6. #### Write all code you want with .ts inside src folder
    ```
    > src
        > demo.ts
        > index.ts
    ```
---
7. #### After finishing run this to compile files from ts to js
    ```
    npx tsc 
    ```
    or
    
    ```
    npx tsc -w
    ```