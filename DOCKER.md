# Docker Deployment Guide

## Overview
This Angular e-commerce application uses a multi-stage Docker build for optimal production deployment.

## Build Strategy
- **Stage 1**: Build the Angular application using Node.js 18
- **Stage 2**: Serve the built application using Nginx

## Quick Start

### Build the Docker image
```bash
docker build -t ecom-project:latest .
```

### Run the container
```bash
docker run -d -p 8080:80 --name ecom-app ecom-project:latest
```

Access the application at: http://localhost:8080

### Using Docker Compose
```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Docker Commands

### Build
```bash
# Build with tag
docker build -t ecom-project:v1.0.0 .

# Build with no cache
docker build --no-cache -t ecom-project:latest .
```

### Run
```bash
# Run on port 8080
docker run -d -p 8080:80 --name ecom-app ecom-project:latest

# Run with custom port
docker run -d -p 3000:80 --name ecom-app ecom-project:latest

# Run with environment variables
docker run -d -p 8080:80 -e NODE_ENV=production --name ecom-app ecom-project:latest
```

### Management
```bash
# View running containers
docker ps

# View logs
docker logs ecom-app
docker logs -f ecom-app  # Follow logs

# Stop container
docker stop ecom-app

# Start container
docker start ecom-app

# Remove container
docker rm ecom-app

# Remove image
docker rmi ecom-project:latest
```

## Health Check
The container includes a health check endpoint at `/health` that runs every 30 seconds.

Check container health:
```bash
docker inspect --format='{{.State.Health.Status}}' ecom-app
```

## Image Size Optimization
- Uses Alpine Linux base images for minimal size
- Multi-stage build removes build dependencies from final image
- Only production artifacts are included in the final image

## Nginx Configuration
The custom nginx configuration includes:
- Angular routing support (SPA fallback to index.html)
- Gzip compression for better performance
- Security headers
- Static asset caching (1 year for images, fonts, etc.)
- Health check endpoint

## Production Deployment

### Push to Docker Registry
```bash
# Tag for registry
docker tag ecom-project:latest your-registry.com/ecom-project:latest

# Push to registry
docker push your-registry.com/ecom-project:latest
```

### Deploy to Server
```bash
# Pull and run on production server
docker pull your-registry.com/ecom-project:latest
docker run -d -p 80:80 --name ecom-app --restart unless-stopped your-registry.com/ecom-project:latest
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs ecom-app

# Check if port is already in use
netstat -tuln | grep 8080
```

### Build fails
```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t ecom-project:latest .
```

### Access container shell
```bash
docker exec -it ecom-app sh
```

## Environment Variables
Currently, the application doesn't require environment variables at runtime. If you need to add Firebase configuration or other environment-specific settings, consider:
1. Using Angular environment files during build
2. Injecting configuration at runtime via nginx
3. Using Docker secrets for sensitive data
