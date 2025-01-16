export async function loginWithToken(token: string) {
    const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    if (!response.ok) {
        throw new Error("Failed to log in");
    }

    return response.json();
}
