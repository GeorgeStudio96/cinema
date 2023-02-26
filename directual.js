fetch('https://api.directual.com/good/api/v5/data/users/getUsers?appID=20fbff51-fcb0-4feb-98d6-3f9628859615&sessionID=', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(data.payload[0].first_name)
    })