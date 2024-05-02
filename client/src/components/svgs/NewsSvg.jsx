import headerStyles from '../../css/components/Header.module.css'

const NewsSvg = (props) => {

    const {className} = props

    return (
        <svg className={className} version='1.1' xmlns='http://www.w3.org/2000/svg' width='27' height='20' viewBox='0 0 128 96' preserveAspectRatio='xMidYMid meet'>
            <path d="M0 0 C0.80803542 0.00054477 1.61607084 0.00108953 2.44859219 0.00165081 C3.3754533 -0.00254368 4.30231441 -0.00673817 5.25726223 -0.01105976 C6.27708187 -0.00544025 7.29690151 0.00017925 8.34762478 0.00596905 C9.95499256 0.00312153 9.95499256 0.00312153 11.59483242 0.00021648 C15.15044284 -0.00349985 18.70585075 0.0072245 22.26144314 0.01842022 C24.722416 0.01961156 27.18338932 0.02006528 29.64436245 0.01980877 C34.80687199 0.02137508 39.96931233 0.02967653 45.13180447 0.04307842 C51.76576284 0.06007735 58.39964514 0.0638926 65.03362274 0.06313324 C70.1163446 0.0634045 75.19904965 0.0688785 80.28176594 0.07613468 C82.72872128 0.07932787 85.17567853 0.08129026 87.62263584 0.08202839 C91.03490508 0.08418458 94.44709186 0.09291288 97.85934353 0.1036253 C98.8811874 0.10317211 99.90303127 0.10271893 100.95584011 0.10225201 C101.8798814 0.10651699 102.80392269 0.11078197 103.75596523 0.1151762 C104.96745283 0.11768997 104.96745283 0.11768997 106.20341492 0.12025452 C108.03878689 0.24888897 108.03878689 0.24888897 109.03878689 1.24888897 C109.16584136 3.88921303 109.22801658 6.50395279 109.24752712 9.14586163 C109.25731091 9.97357067 109.26709469 10.80127972 109.27717495 11.65407085 C109.30720891 14.40701455 109.32854082 17.1599092 109.34738064 19.91295147 C109.35395247 20.8520977 109.36052429 21.79124393 109.36729527 22.75884914 C109.39992995 27.7335411 109.42436612 32.70821132 109.44381618 37.682971 C109.46160817 41.79982567 109.49638832 45.91599264 109.54635525 50.03258038 C109.60659156 55.00049448 109.63729765 59.96777228 109.64698887 64.9360342 C109.65554247 66.82826283 109.67435833 68.72047452 109.70373249 70.61249447 C109.74272098 73.26759508 109.74367228 75.92022934 109.73580837 78.57554913 C109.75580898 79.35297466 109.77580959 80.1304002 109.79641628 80.93138409 C109.7264461 86.21386038 108.28134964 88.95198335 104.71740723 92.82724857 C101.36659699 95.66508336 98.66250254 96.49825238 94.30149746 96.52977276 C93.35242519 96.54119305 92.40335293 96.55261333 91.4255209 96.56437969 C90.39112377 96.56661541 89.35672665 96.56885113 88.29098415 96.57115459 C86.64892498 96.58604931 86.64892498 96.58604931 84.97369289 96.60124493 C81.35083414 96.630466 77.72815039 96.64408661 74.10519314 96.65513897 C71.58940023 96.66664166 69.07360739 96.67815713 66.5578146 96.68968487 C61.95691929 96.70801194 57.35607421 96.72061649 52.75514656 96.72667837 C45.98795513 96.73564437 39.22157074 96.7707692 32.45462471 96.82867956 C26.58771624 96.87714115 20.72107696 96.89256763 14.85398579 96.89602947 C12.3600509 96.90208969 9.86611973 96.91817103 7.37231541 96.94439983 C3.88624628 96.9784545 0.40215142 96.97477968 -3.08401585 96.96177959 C-4.63257519 96.98942394 -4.63257519 96.98942394 -6.21241856 97.01762676 C-12.88889503 96.93950379 -12.88889503 96.93950379 -15.72142601 95.11524296 C-19.17168986 91.4591026 -19.5725261 87.98236854 -19.52884007 83.14195538 C-19.5295702 82.45832928 -19.53030033 81.77470318 -19.53105259 81.07036114 C-19.52759228 78.82956015 -19.48881205 76.59088537 -19.44949436 74.35045147 C-19.44016052 72.78962114 -19.43304711 71.22877609 -19.42805576 69.66792583 C-19.40903043 65.57405423 -19.35996977 61.48107974 -19.30453587 57.38756084 C-19.25324595 53.20474157 -19.23052105 49.02177631 -19.20535374 44.83873272 C-19.15184525 36.64170797 -19.06658836 28.44541029 -18.96121311 20.24888897 C-15.67601836 19.15382405 -13.22457896 19.14928289 -9.77371311 19.18638897 C-8.14369358 19.19992413 -8.14369358 19.19992413 -6.48074436 19.21373272 C-5.64929905 19.22533428 -4.81785374 19.23693584 -3.96121311 19.24888897 C-3.98441624 18.04490459 -4.00761936 16.84092022 -4.03152561 15.60045147 C-4.05028174 14.02493682 -4.06848211 12.44941549 -4.08621311 10.87388897 C-4.10297092 10.07982647 -4.11972874 9.28576397 -4.13699436 8.46763897 C-4.15456784 6.39396882 -4.06456479 4.32005655 -3.96121311 2.24888897 C-1.96121311 0.24888897 -1.96121311 0.24888897 0 0 Z M6.03878689 9.24888897 C5.70878689 34.98888897 5.37878689 60.72888897 5.03878689 87.24888897 C21.11493062 87.36520694 21.11493062 87.36520694 37.19113064 87.44420147 C43.74676343 87.46812543 50.30217305 87.49644621 56.85763454 87.55064678 C62.14201969 87.59406534 67.42616556 87.61801789 72.71071529 87.62839794 C74.72819442 87.63579646 76.74566025 87.65024384 78.76303768 87.6718092 C81.58603765 87.70078998 84.40804524 87.70484719 87.2311697 87.70299053 C88.0677058 87.71737164 88.90424191 87.73175274 89.76612759 87.74656963 C93.4347613 87.72041182 95.56593925 87.61063255 98.52676296 85.34550762 C101.2756775 81.53377859 101.16050036 79.11242194 101.15231228 74.41246319 C101.15249308 73.34158553 101.15249308 73.34158553 101.15267754 72.24907398 C101.15193004 69.93387666 101.14430925 67.61875943 101.13644314 65.30357647 C101.13497321 63.87592387 101.13395281 62.44827073 101.13339138 61.02061749 C101.12814437 55.72169977 101.11418321 50.42279359 101.10128689 45.12388897 C101.07034939 27.36576397 101.07034939 27.36576397 101.03878689 9.24888897 C69.68878689 9.24888897 38.33878689 9.24888897 6.03878689 9.24888897 Z M-10.96121311 29.24888897 C-11.01183477 37.02677418 -11.04691357 44.80461706 -11.07107639 52.5826292 C-11.08114717 55.22978077 -11.09480447 57.87692118 -11.11209202 60.52403545 C-11.13629283 64.32427502 -11.14768539 68.12436778 -11.15652561 71.92467022 C-11.16684818 73.11224422 -11.17717075 74.29981823 -11.18780613 75.52337933 C-11.18795719 76.62429409 -11.18810825 77.72520885 -11.18826389 78.85948467 C-11.19270512 79.82989193 -11.19714634 80.80029919 -11.20172215 81.80011272 C-11.129954 84.50571849 -11.129954 84.50571849 -8.96121311 87.24888897 C-6.48621311 86.75388897 -6.48621311 86.75388897 -3.96121311 86.24888897 C-3.96121311 67.43888897 -3.96121311 48.62888897 -3.96121311 29.24888897 C-6.27121311 29.24888897 -8.58121311 29.24888897 -10.96121311 29.24888897 Z " transform="translate(18.96121311187744,-0.24888896942138672)"/>
            <path d="M0 0 C1.19496094 0.00064453 2.38992187 0.00128906 3.62109375 0.00195312 C4.87019531 0.01806641 6.11929688 0.03417969 7.40625 0.05078125 C9.27990234 0.04594727 9.27990234 0.04594727 11.19140625 0.04101562 C20.50574617 0.0962787 20.50574617 0.0962787 23.90625 2.36328125 C25.13341023 6.04476195 25.09031814 9.46738887 25.09375 13.30078125 C25.10599609 14.01685547 25.11824219 14.73292969 25.13085938 15.47070312 C25.14131429 19.23098721 25.13807489 22.2387264 22.90625 25.36328125 C18.44848509 27.59216371 12.3639823 26.59320854 7.46875 26.61328125 C6.21513672 26.63390625 4.96152344 26.65453125 3.66992188 26.67578125 C1.87071289 26.68351562 1.87071289 26.68351562 0.03515625 26.69140625 C-1.61891235 26.7054248 -1.61891235 26.7054248 -3.30639648 26.71972656 C-6.09375 26.36328125 -6.09375 26.36328125 -7.9519043 25.12792969 C-9.40424461 22.88343198 -9.48095838 21.46582529 -9.4921875 18.80078125 C-9.49605469 17.92164062 -9.49992187 17.0425 -9.50390625 16.13671875 C-9.49230469 15.22148438 -9.48070312 14.30625 -9.46875 13.36328125 C-9.48615234 11.99042969 -9.48615234 11.99042969 -9.50390625 10.58984375 C-9.50003906 9.71070313 -9.49617188 8.8315625 -9.4921875 7.92578125 C-9.48711182 6.72115234 -9.48711182 6.72115234 -9.48193359 5.4921875 C-9.09375 3.36328125 -9.09375 3.36328125 -7.94970703 1.60083008 C-5.27062629 -0.18557617 -3.20014232 -0.00870115 0 0 Z " transform="translate(44.09375,18.63671875)"/>
            <path d="M0 0 C1.03196503 -0.00744736 1.03196503 -0.00744736 2.08477783 -0.01504517 C4.36455275 -0.02967101 6.64425811 -0.03646893 8.92407227 -0.04199219 C10.50586449 -0.04774265 12.08765668 -0.05350039 13.66944885 -0.05926514 C16.98748093 -0.06977588 20.30548877 -0.07561827 23.62353516 -0.07910156 C27.87864903 -0.08459098 32.13344366 -0.10862799 36.3884573 -0.13707352 C39.65608157 -0.15567996 42.92362857 -0.16090439 46.19130135 -0.16243744 C47.76022146 -0.16546828 49.32914009 -0.17351134 50.89800835 -0.18662262 C53.09110839 -0.2036445 55.28342352 -0.20181301 57.4765625 -0.1953125 C58.72517563 -0.19895813 59.97378876 -0.20260376 61.26023865 -0.20635986 C64.30297852 0.16113281 64.30297852 0.16113281 66.24134827 1.52325439 C67.30297852 3.16113281 67.30297852 3.16113281 67.11547852 5.72363281 C66.30297852 8.16113281 66.30297852 8.16113281 64.30297852 10.16113281 C61.38722229 10.40837097 61.38722229 10.40837097 57.60595703 10.40405273 C56.573992 10.40690025 56.573992 10.40690025 55.5211792 10.4098053 C53.24129937 10.41351745 50.96173642 10.40280169 48.68188477 10.39160156 C47.10009295 10.39040974 45.51830042 10.38995661 43.93650818 10.39021301 C40.61843445 10.38864731 37.30046849 10.38035203 33.98242188 10.36694336 C29.72741824 10.34996726 25.47253327 10.3461286 21.21749973 10.34688854 C17.94987351 10.34661667 14.68227327 10.34113246 11.41465569 10.3338871 C9.84575535 10.33070272 8.27685207 10.32873356 6.70794868 10.32799339 C4.51504626 10.3258266 2.32226989 10.31707462 0.12939453 10.30639648 C-1.1192186 10.30258469 -2.36783173 10.29877289 -3.65428162 10.29484558 C-6.69702148 10.16113281 -6.69702148 10.16113281 -9.69702148 9.16113281 C-9.69702148 8.50113281 -9.69702148 7.84113281 -9.69702148 7.16113281 C-10.35702148 6.83113281 -11.01702148 6.50113281 -11.69702148 6.16113281 C-8.34610449 0.22087087 -6.7478632 0.03692401 0 0 Z " transform="translate(43.697021484375,66.8388671875)"/>
            <path d="M0 0 C0.68841476 -0.00554901 1.37682953 -0.01109802 2.08610535 -0.01681519 C4.35027768 -0.02857892 6.61243412 -0.00437869 8.87646484 0.02148438 C10.45396839 0.02319608 12.03147478 0.02312918 13.60897827 0.0213623 C16.90935607 0.02301352 20.20905291 0.04167766 23.50927734 0.07324219 C27.7408699 0.11298502 31.97157379 0.11727889 36.20331764 0.10977936 C39.45814161 0.10671164 42.71276548 0.11882189 45.96754074 0.13591003 C47.52805705 0.14294262 49.08859603 0.14606425 50.64912796 0.1452179 C52.82770142 0.14701394 55.00520511 0.16837472 57.18359375 0.1953125 C58.42315826 0.20373169 59.66272278 0.21215088 60.93984985 0.2208252 C63.96240234 0.61523438 63.96240234 0.61523438 65.89389038 1.98132324 C66.96240234 3.61523438 66.96240234 3.61523438 66.83740234 6.17773438 C65.96240234 8.61523438 65.96240234 8.61523438 62.96240234 10.61523438 C59.93312073 10.88938904 59.93312073 10.88938904 56.16772461 10.92163086 C55.48120819 10.92995438 54.79469177 10.93827789 54.08737183 10.94685364 C51.8177931 10.97095076 49.54850168 10.97972463 47.27880859 10.98632812 C45.70084039 10.99529379 44.12287306 11.00441562 42.54490662 11.01368713 C39.23702935 11.03017824 35.92925333 11.03787761 32.62133789 11.04077148 C28.38289951 11.0461595 24.14541232 11.08385497 19.90724277 11.12951565 C16.64813257 11.15925775 13.38925237 11.16649438 10.13001823 11.16749763 C8.56748021 11.17170467 7.00494179 11.18415853 5.44253731 11.20501518 C3.25647091 11.23187716 1.07262181 11.22712286 -1.11352539 11.21459961 C-2.3569017 11.21967026 -3.60027802 11.22474091 -4.8813324 11.22996521 C-8.03759766 10.61523438 -8.03759766 10.61523438 -10.47035217 8.07777405 C-10.98754318 7.26513596 -11.50473419 6.45249786 -12.03759766 5.61523438 C-8.1829629 1.00956623 -5.9748758 -0.00989001 0 0 Z " transform="translate(44.03759765625,50.384765625)"/>
            <path d="M0 0 C2.05013493 -0.00971283 4.09927004 -0.04074007 6.14916992 -0.07226562 C7.43887695 -0.07742187 8.72858398 -0.08257813 10.05737305 -0.08789062 C11.83712524 -0.10190918 11.83712524 -0.10190918 13.65283203 -0.11621094 C16.6237793 0.24023438 16.6237793 0.24023438 18.54589844 1.60058594 C19.6237793 3.24023438 19.6237793 3.24023438 19.4362793 5.80273438 C18.6237793 8.24023438 18.6237793 8.24023438 16.6237793 10.24023438 C12.36703705 10.66183431 8.09553505 10.61182914 3.8203125 10.61083984 C1.69734396 10.61521159 -0.42354238 10.65151876 -2.54614258 10.68945312 C-3.89444276 10.6953217 -5.24275282 10.69929082 -6.59106445 10.70117188 C-7.81946045 10.70938965 -9.04785645 10.71760742 -10.31347656 10.72607422 C-13.3762207 10.24023438 -13.3762207 10.24023438 -15.34326172 8.37939453 C-16.3762207 6.24023438 -16.3762207 6.24023438 -15.6887207 3.55273438 C-12.65548673 -1.791535 -5.44507428 0.01565239 0 0 Z " transform="translate(91.376220703125,18.759765625)"/>
            <path d="M0 0 C1.28841797 -0.01611328 2.57683594 -0.03222656 3.90429688 -0.04882812 C5.75958008 -0.04979492 5.75958008 -0.04979492 7.65234375 -0.05078125 C9.35185181 -0.05525269 9.35185181 -0.05525269 11.08569336 -0.05981445 C14.32985904 0.34593907 15.69159193 1.12254965 18.0625 3.3125 C17.3125 8.0625 17.3125 8.0625 15.0625 10.3125 C10.96323593 10.71095102 6.85825217 10.641528 2.74121094 10.62817383 C0.70192618 10.62502229 -1.33589562 10.64843792 -3.375 10.67382812 C-5.30472656 10.67479492 -5.30472656 10.67479492 -7.2734375 10.67578125 C-8.45470215 10.67876221 -9.6359668 10.68174316 -10.85302734 10.68481445 C-14.16715794 10.2847789 -15.52937594 9.55911713 -17.9375 7.3125 C-17.625 4.9375 -17.625 4.9375 -16.9375 2.3125 C-11.88064464 -1.0587369 -5.93749765 -0.01480673 0 0 Z " transform="translate(92.9375,34.6875)"/>
        </svg>
    )
}

export default NewsSvg