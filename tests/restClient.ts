import http from 'http';

/** Функція для виконання HTTP-запиту */
export function makeRequest(method: string, path: string, body?: any): Promise<{ statusCode: number; data: any }> {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 30002,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode || 500,
                    data: data ? JSON.parse(data) : null,
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
}