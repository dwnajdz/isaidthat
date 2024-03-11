# This file was created to minimize storage size of this app 

build_app_source () {
    echo "/standalone folder not found, building app"
    cd src

    # build app
    npm install --omit=dev
    npm run build

    sleep 10
    if [ -d ".next/standalone" ]; then
        echo "moving standalone folder"
        mv ./.next/static ./.next/standalone/.next
        mv ./.next/standalone ./../    
    fi

    cd ..
}

if  [ ! -d "standalone" ]; then
    build_app_source
fi

useDocker="$1"
if [ $useDocker == "true" ]; then 
    if command -v docker &> /dev/null; then
        echo "Using docker build"
        docker build -t web-production-standalone -f standalone.Dockerfile .
        docker run -d -p 80:80 web-production-standalone
    else
        echo "docker not found"
    fi
else
    echo "not saving docker"
fi