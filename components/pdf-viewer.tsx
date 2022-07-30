import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { Document, Page, pdfjs } from "react-pdf";
import { useDrag } from '@use-gesture/react';
import { classNames } from "@/common/helpers";
import { useDetectIsMobileView } from "@/hooks/useDetectIsMobileView";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/pro-regular-svg-icons";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export interface IPDFViewerProps {
  url: string;
  initialPageNumber?: number;
  width?: number;
  height?: number;
}

export default function PDFViewer({url, initialPageNumber=1, width, height}: IPDFViewerProps) {
  const [numPages, setNumPages] = useState(null);
  const docRef = useRef<HTMLDivElement>(null);
  const navigatorDiv = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { isMobileView } = useDetectIsMobileView();
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  
  const bind:any = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) {
      if(xDir === 1)  { //left
        if(pageNumber > 1) {
          setPageNumber(pageNumber - 1);
        }
      }
      if(xDir === -1) { //right
        if(pageNumber < numPages) {
          setPageNumber(pageNumber + 1);
        }
      }
    } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
  });

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const onMouseMove = (e)=> {
    navigatorDiv.current.style.display = 'flex';
  }

  const onMouseLeave = () => {
    navigatorDiv.current.style.display = 'none';
  }

  const canGoNext = useMemo(() => pageNumber < numPages, [pageNumber, numPages]);
  const canGoPrevious = useMemo(() => pageNumber > 1, [pageNumber]);

  const isDeviceMobile = isMobile || isMobileView || isTablet;

  return (
    <div className="w-full flex flex-col justify-center items-center prose gap-y-vmd">
      <div ref={docRef} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove} className="relative flex justify-center" {...bind()}>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className="w-full flex justify-center" renderMode="canvas">
          <Page className={scale === 1.5 ? 'hover:cursor-zoom-out' : 'hover:cursor-zoom-in'} onClick={() => {
            !isDeviceMobile && setScale(scale === 1.5 ? 1 : 1.5);
          }} pageNumber={pageNumber} width={width} height={height} scale={scale}/>
        </Document>
        <div ref={navigatorDiv} className="hidden flex-col justify-center items-center z-50 gap-y-vmd bg-accent-dark-200/90 p-vsm rounded-2xl shadow-light-md absolute bottom-2">
          <div className="flex gap-vsm items-center">
            <button disabled={!canGoPrevious} onClick={() => canGoPrevious && setPageNumber(pageNumber - 1)} className={classNames(canGoPrevious ? 'text-light-200 hover:text-light-400' : 'text-dark-500')}>
              <FontAwesomeIcon className="w-7 h-7" icon={faAngleLeft}></FontAwesomeIcon>
            </button >
            <p className="text-light-200 text-body-xs font-bold">Page: {pageNumber} of {numPages}</p>
            <button disabled={!canGoNext} onClick={() => canGoNext && setPageNumber(pageNumber + 1)} className={classNames(canGoNext ? 'text-light-200 hover:text-light-400' : 'text-dark-500')}>
              <FontAwesomeIcon className="w-7 h-7" icon={faAngleRight}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
