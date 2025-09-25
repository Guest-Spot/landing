# Exara Landing Page

![Exara Banner](./public/banner.png)

Exara is an AI-powered browser extension that instantly explains unfamiliar words and terms directly on web pages. Simply highlight text to get an explanation—no need to lose context or open new tabs.

[>>> Go to the Exara Extension on GitHub <<<](https://github.com/denisoed/exara-extension)

## Key Features

- Instant explanations for highlighted text right on the page
- PDF support via a built-in viewer
- Ability to ask a clarifying question for deeper understanding
- Cross-browser compatibility
- Free plan: 25 explanations per month

## Who is Exara for?

- Students and researchers
- Professionals working with industry-specific terminology
- Language learners
- Anyone encountering complex or new concepts in text

---

## Docker Setup for Production

The project includes Docker configuration to easily deploy the static site in a production environment.

### Building the Docker Image Manually

To build the Docker image manually, run:

```bash
docker build -t exara-landing .
```

### Running the Docker Container Manually

To run the container after building:

```bash
docker run -p 3000:3000 exara-landing
```

This will start the Nginx server and make the website available at http://localhost:3000.

### Configuration

The Docker setup uses Nginx to serve the static files with the following optimizations:

- Gzip compression for faster content delivery
- Proper cache headers for different file types
- Basic security headers
- Error page handling

You can modify the `nginx.conf` file to adjust the server configuration if needed.

### Troubleshooting

If you encounter 403 Forbidden errors when accessing SVG files:

1. Make sure SVG files exist in the correct location
2. Check that file permissions are set correctly (755)
3. Verify that the Nginx configuration includes proper MIME types for SVG files
