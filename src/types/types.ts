export interface BookProps {
  mastrId: String;
  listSeCd: String;
  title: String;
  pictrWritrNm: String;
  sntncWritrNm: String;
  mainGenreCd: String;
  mainGenreCdNm: String;
  orginlNationCd: String;
  orginlNationCdNm: String;
  imageDownloadUrl: String;
}

export interface Result {
  listSeCd: String;
  pageNo: Number;
  resultMessage: String;
  resultState: String;
  totalcount: Number;
  viewItemCnt: Number;
}
export interface Item {
  mastrId: String;
  listSeCd: String;
  listSeCdNm: String;
  prdctNm: String;
  title: String;
  subtitl: String | null;
  edtn: String | null;
  pictrWritrNm: String;
  sntncWritrNm: String;
  plscmpnIdNm: String | null;
  orginlTitle: String;
  originClCd: String | null;
  originClCdNm: String | null;
  stleClCd: String | null;
  stleClCdNm: String | null;
  mainGenreCd: String;
  mainGenreCdNm: String;
  outline: String;
  isbn: String;
  issn: String | null;
  setIsbn: String | null;
  pltfomCd: Number;
  pltfomCdNm: String;
  pltfomCmpnyIdNm: String;
  ageGradCd: Number;
  ageGradCdNm: String;
  pusryBeginDe: Number;
  pusryEndDe: String | null;
  fnshYn: String;
  pblcateYn: String;
  webtoonPusryYn: String;
  wnpzCareer: String | null;
  dstrcpIdNm: String | null;
  pblicteDe: String | null;
  dtaTyCd: String | null;
  dtaTyCdNm: String | null;
  orginlNationCd: String;
  orginlNationCdNm: String;
  relDe: String | null;
  tlviseBeginDe: String | null;
  tlviseEndDe: String | null;
  bdcpn: String | null;
  makr: String | null;
  distr: String | null;
  auspc: String | null;
  mngt: String | null;
  stndrd: String | null;
  pgeCo: String | null;
  wt: String | null;
  prc: number | null;
  eventSeCd: String | null;
  eventSeCdNm: String | null;
  cnsleNm: String | null;
  imageDownloadUrl: String;
}

export interface BookData {
  result: Result;
  itemList: Item[];
}
