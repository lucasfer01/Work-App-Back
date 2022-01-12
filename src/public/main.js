const PUBLIC_VAPID_KEY = "BIGOGlUA89Jmop6cxKKXBw26LSl679plMCPJ6oDykA5Ik6KlM90sBZcxy80tkPq5HIYd-55vc-M-3Xs1my8SgX4";

const subscription = async () => {
    // Service Worker
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    })
    console.log("New serviceworker");

    // PushManager
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY,
    });

    await fetch("/subscription", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log("subscribed!");
}

const form = document.querySelector("#myform");
const message = document.querySelector("#message");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    fetch("/new-message", {
        method: "POST",
        body: JSON.stringify({
            message: message.value,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    form.reset();
})

subscription();

