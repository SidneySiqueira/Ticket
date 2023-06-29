export default function formatarData(dataString: string) {
  const parts = dataString.split('/'); 

  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

  return formattedDate;
}