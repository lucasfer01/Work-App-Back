console.log("ServiceWorker")

self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log(data);
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: "https://cdn-icons-png.flaticon.com/512/655/655680.png",
    })
});