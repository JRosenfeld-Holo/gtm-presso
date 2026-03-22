import { motion } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'

export default function Slide02() {
  return (
    <SlideWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 880,
            width: '100%',
            border: '1px solid rgba(191,253,17,0.18)',
            borderRadius: 12,
            padding: '40px 52px',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(6px)',
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 28,
              paddingBottom: 20,
              borderBottom: '1px solid rgba(191,253,17,0.12)',
            }}
          >
            <div
              style={{
                width: 3,
                height: 32,
                background: 'var(--color-lime)',
                boxShadow: 'var(--glow-lime)',
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <MonoLabel style={{ fontSize: 12 }}>Note to Recipient — Confidential</MonoLabel>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {[
              'This material has been prepared by Bank of America Corporation ("BAC") and is provided for informational purposes only. It does not constitute a binding commitment or agreement. The information contained herein has not been independently verified and is based on information available as of the date of preparation.',
              'This material is not intended to provide legal, tax, compliance, or accounting advice. Recipients should consult their own advisors regarding any legal, tax, or financial matters. The projections and forward-looking statements contained herein are based on certain assumptions and may differ materially from actual results.',
              'BAC and its affiliates may engage in activities or transactions that differ from or conflict with the information contained herein. This material may not be reproduced or redistributed in whole or in part without the prior written consent of BAC.',
              'The information herein is subject to change without notice. BAC makes no representation or warranty, express or implied, as to the accuracy or completeness of the information contained herein and accepts no liability for any loss arising from the use of this material.',
              'This material is subject to compliance with applicable regulatory requirements across jurisdictions including but not limited to: Argentina, Brazil, Chile, Colombia, Dubai, Hong Kong, Saudi Arabia, Mexico, Peru, Qatar, Ireland, United Kingdom, Indonesia, and Philippines.',
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-roobert)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <MonoLabel style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
              ©2026 Bank of America Corporation
            </MonoLabel>
            <MonoLabel style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
              All Rights Reserved
            </MonoLabel>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}
