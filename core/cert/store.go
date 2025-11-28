package cert

import "sync"

type CachedCert struct {
	CertPEM []byte
	KeyPEM  []byte
}

var (
	certCache = make(map[string]CachedCert)
	mu        sync.RWMutex
)

func GetOrCreateLeaf(host string) (certPEM, keyPEM []byte, err error) {
	mu.RLock()
	cached, found := certCache[host]
	mu.RUnlock()

	if found {
		return cached.CertPEM, cached.KeyPEM, nil
	}

	certPEM, keyPEM, err = CreateCertForHost(host)
	if err != nil {
		return nil, nil, err
	}

	mu.Lock()
	certCache[host] = CachedCert{certPEM, keyPEM}
	mu.Unlock()
	return certPEM, keyPEM, nil
}
