<mat-drawer-container class="main-container">
    <!-- sidebar content -->
    <mat-drawer #drawer mode="side" opened disableClose>
        <app-sidebar
            *ngIf="channels$ | async as channels; else noChannels"
            [channels]="channels"
        />
        <ng-template #noChannels
            >No channels <br />
            <button mat-button color="secondary" (click)="navigateHome()">
                Go back
            </button></ng-template
        >
    </mat-drawer>
    <mat-drawer-content>
        <ng-container *ngIf="activeChannel$ | async as activeChannel">
            <!-- toolbar with drawer icon -->
            <app-toolbar
                (toggleLeftDrawerClicked)="drawer.toggle()"
                (toggleRightDrawerClicked)="drawerRight.toggle()"
                (multiEpgClicked)="openMultiEpgView()"
                [activeChannel]="activeChannel"
            />

            <app-audio-player
                *ngIf="activeChannel.radio === 'true'; else videoPlayer"
                [url]="activeChannel.url"
                [icon]="activeChannel?.tvg?.logo"
            />
            <ng-template #videoPlayer>
                <!-- video.js player -->
                <app-vjs-player
                    *ngIf="playerSettings.player === 'videojs'"
                    [options]="{
                        sources: [
                            {
                                src:
                                    activeChannel?.url +
                                    activeChannel?.epgParams,
                                type: 'application/x-mpegURL'
                            }
                        ]
                    }"
                    [class.hide-captions]="!playerSettings.showCaptions"
                ></app-vjs-player>

                <!-- default html player component -->
                <app-html-video-player
                    *ngIf="playerSettings.player === 'html5'"
                    [channel]="activeChannel"
                    [showCaptions]="playerSettings.showCaptions"
                />
                <div class="mpv-player" *ngIf="playerSettings.player === 'mpv'">
                    <img src="./assets/images/custom-player.png" />
                    <p>
                        The channel is played in a separate window in the MPV
                        player. (<a
                            [routerLink]
                            style="cursor: pointer"
                            (click)="
                                openUrl(
                                    'https://github.com/4gray/iptvnator/wiki/What-is-mpv-video-player-and-how-to-install-it-on-different-operating-systems%3F'
                                )
                            "
                            >Installation instructions</a
                        >)
                    </p>
                </div>
                <!-- channel overlay -->
                <app-info-overlay
                    [channel]="activeChannel"
                    [epgProgram]="epgProgram$ | async"
                ></app-info-overlay>
            </ng-template>
        </ng-container>
    </mat-drawer-content>
    <!-- right sidebar content -->
    <mat-drawer position="end" #drawerRight mode="side" disableClose>
        <app-epg-list *ngIf="isElectron"></app-epg-list>
    </mat-drawer>
</mat-drawer-container>
