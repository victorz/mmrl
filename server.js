async function main() {
  const url = `https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/${Deno.args[0]}`
  const data = await fetch(url)
  console.log(JSON.stringify(await data.json()))
}

main()
