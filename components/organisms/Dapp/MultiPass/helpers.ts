export const mapRankToColors = (rank: number) => {
  switch(rank) {
    case 0:
      return {bgColor: '#734a9e', textColor: 'rgb(250 251 255)'};
    case 1:
      return {bgColor: '#d8b08b', textColor: 'rgb(250 251 255)'};
    case 2:
      return {bgColor: '#fff3ad', textColor: '#11081F'};
    case 3:
      return {bgColor: '#414141', textColor: 'rgb(250 251 255)'};
    case 4:
      return {bgColor: '#eaf5f8', textColor: '#11081F'};
    default:
      return {bgColor: '#734a9e', textColor: 'rgb(250 251 255)'};
  }
}

export const mapRankToImage = (rank: number) => {
  switch(rank) {
    case 0:
      return '/multipass/0.webp';
    case 1:
      return '/multipass/1.webp';
    case 2:
      return '/multipass/2.webp';
    case 3:
      return '/multipass/3.webp';
    case 4:
      return '/multipass/4.webp';
    default:
      return '/multipass/0.webp';
  }
}