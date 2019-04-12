import * as React from 'react';
import { cn } from '@bem-react/classname';

import { YandexComments } from '../YandexComments/YandexComments';
import foldIcon from './images/foldIcon.svg';
import './NewsCommentsCurtain.scss';

const cls = cn('news-comments-curtain');

export enum Mode {
    FOLDED = 'folded',
    PREVIEW = 'preview',
    OPEN = 'open'
}

export interface IProps {}
export interface IState {
    mode: Mode;
}

export class NewsCommentsCurtain extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.curtainRef = React.createRef();
        this.inputRef = React.createRef();

        this.state = { mode: Mode.FOLDED };
    }

    private scroll: number = window.pageYOffset;
    private curtainRef: React.RefObject<HTMLDivElement>;
    private inputRef: React.RefObject<HTMLInputElement>;

    componentDidMount() {
        const { mode } = this.state;

        if (mode === Mode.OPEN) {
            this.disableBodyScroll();
        }
    }

    handleHeaderClick = () => {
        const { mode } = this.state;

        switch (mode) {
            case Mode.FOLDED:
                // this.inputRef.current!.focus();
                this.open();
                break;

            case Mode.OPEN:
                this.fold();
                break;
        
            default:
                break;
        }
    }

    handleFoldClick = () => {
        this.fold();
    }

    handleInputClick = (e: React.SyntheticEvent) => {
        const { mode } = this.state;
        e.stopPropagation();

        if (mode === Mode.FOLDED) {
            this.open();

            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 200);
        }
    }

    open = () => {
        this.setState({ mode: Mode.OPEN });
        this.disableBodyScroll();
    }

    fold = () => {
        this.setState({ mode: Mode.FOLDED });
        this.enableBodyScroll();
    }

    disableBodyScroll = () => {
        this.scroll = window.pageYOffset;
        document.body.style.top = `${-this.scroll}px`;
        document.body.classList.add('page_curtain_open');
    }

    enableBodyScroll = () => {
        document.body.classList.remove('page_curtain_open');
        window.scrollTo(0, this.scroll);
    }

    render() {
        const { mode } = this.state; 

        return (
            <div className={cls({mode})} ref={this.curtainRef}>
                <div className={cls('overlay')}></div>
                <div className={cls('container')}>
                    {mode === Mode.FOLDED ?
                        <div className={cls('header')} onClick={this.handleHeaderClick}>HEADER</div> :
                        <div className={cls('fold')} onClick={this.handleFoldClick}>FOLD</div>
                    }
                    <div className={cls('content')}>
                        <YandexComments />
                    </div>
                </div>
            </div>
        );
    }
}
