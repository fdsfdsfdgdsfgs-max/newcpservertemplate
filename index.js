// This tells your code to use Render's assigned port OR 3000 as a backup
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("Server is online!");
});
